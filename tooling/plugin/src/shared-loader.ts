import type { Styleframe } from "@styleframe/core";
import { isRecipe, isSelector, isStyleframe } from "@styleframe/core";
import { createJiti } from "jiti";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ExportInfo, PluginGlobalState } from "./state";
import { clearFileExports, registerExport, resetState } from "./state";
import {
	CircularDependencyError,
	SharedInstanceNotInitializedError,
} from "./errors";

// Global key for injecting the shared instance during loading
// This is necessary because jiti loads files in a separate context,
// and we need a way to pass the shared instance to the provider shim
const SHARED_INSTANCE_KEY = "__STYLEFRAME_SHARED_INSTANCE__";

// Provider shim path - created once per process
let providerShimPath: string | null = null;

/**
 * Get or create the provider shim file.
 * The shim reads the shared instance from globalThis and exports it.
 */
function getProviderShimPath(): string {
	if (providerShimPath && fs.existsSync(providerShimPath)) {
		return providerShimPath;
	}

	const shimContent = `
export function styleframe() {
	const instance = globalThis["${SHARED_INSTANCE_KEY}"];
	if (!instance) {
		throw new Error('[styleframe] Shared instance not available during loading');
	}
	return instance;
}

export default { styleframe };
`;

	const tempDir = os.tmpdir();
	providerShimPath = path.join(tempDir, `styleframe-shim-${process.pid}.mjs`);
	fs.writeFileSync(providerShimPath, shimContent);

	return providerShimPath;
}

/**
 * Load the config file and initialize the shared instance
 */
export async function loadConfigFile(
	state: PluginGlobalState,
): Promise<Styleframe> {
	const jiti = createJiti(path.dirname(state.configPath), {
		fsCache: false,
		moduleCache: false,
	});

	const module = (await jiti.import(state.configPath)) as Record<
		string,
		unknown
	>;

	if (!module.default) {
		throw new Error(
			`Missing default export in ${state.configPath}. Expected a Styleframe instance.`,
		);
	}

	if (!isStyleframe(module.default)) {
		throw new Error(
			`Invalid default export in ${state.configPath}. Expected a Styleframe instance created with styleframe().`,
		);
	}

	const instance = module.default;
	state.sharedInstance = instance;

	// Track named exports from config
	trackModuleExports(state, module, state.configPath);

	return instance;
}

/**
 * Load a single *.styleframe.ts file using the shared instance
 */
export async function loadStyleframeFile(
	state: PluginGlobalState,
	filePath: string,
	loadOrder: number,
): Promise<void> {
	if (!state.sharedInstance) {
		throw new SharedInstanceNotInitializedError();
	}

	// Circular dependency detection
	if (state.loadingFiles.has(filePath)) {
		throw new CircularDependencyError(filePath, [...state.loadingFiles]);
	}

	state.loadingFiles.add(filePath);

	try {
		// Clear previous exports from this file (for HMR)
		clearFileExports(state, filePath);

		// Set the shared instance on globalThis for the provider shim to access
		(globalThis as Record<string, unknown>)[SHARED_INSTANCE_KEY] =
			state.sharedInstance;

		const jiti = createJiti(path.dirname(filePath), {
			fsCache: false,
			moduleCache: false,
			alias: {
				"virtual:styleframe": getProviderShimPath(),
			},
		});

		const module = (await jiti.import(filePath)) as Record<string, unknown>;

		// Track exports
		trackModuleExports(state, module, filePath);

		// Update file info
		const exports = extractExports(module, filePath);
		state.styleframeFiles.set(filePath, {
			path: filePath,
			loadOrder,
			exports,
			lastModified: Date.now(),
		});
	} finally {
		state.loadingFiles.delete(filePath);
		// Clean up globalThis
		delete (globalThis as Record<string, unknown>)[SHARED_INSTANCE_KEY];
	}
}

/**
 * Load all styleframe files in order
 */
export async function loadAllStyleframeFiles(
	state: PluginGlobalState,
	files: string[],
): Promise<void> {
	for (let i = 0; i < files.length; i++) {
		await loadStyleframeFile(state, files[i], i);
	}
}

/**
 * Reload the config and all styleframe files
 */
export async function reloadAll(
	state: PluginGlobalState,
	files: string[],
): Promise<void> {
	// Clear all state except configPath
	resetState(state);

	// Reload config
	await loadConfigFile(state);

	// Reload all files
	await loadAllStyleframeFiles(state, files);
}

/**
 * Track named exports from a module and register them
 */
function trackModuleExports(
	state: PluginGlobalState,
	module: Record<string, unknown>,
	filePath: string,
): void {
	for (const [name, value] of Object.entries(module)) {
		if (name === "default") continue;

		if (isRecipe(value)) {
			value._exportName = name;
			registerExport(state, {
				name,
				type: "recipe",
				source: filePath,
			});
		} else if (isSelector(value)) {
			value._exportName = name;
			registerExport(state, {
				name,
				type: "selector",
				source: filePath,
			});
		}
	}
}

/**
 * Extract exports from a module for file info tracking
 */
function extractExports(
	module: Record<string, unknown>,
	filePath: string,
): Map<string, ExportInfo> {
	const exports = new Map<string, ExportInfo>();

	for (const [name, value] of Object.entries(module)) {
		if (name === "default") continue;

		if (isRecipe(value)) {
			exports.set(name, { name, type: "recipe", source: filePath });
		} else if (isSelector(value)) {
			exports.set(name, { name, type: "selector", source: filePath });
		}
	}

	return exports;
}
