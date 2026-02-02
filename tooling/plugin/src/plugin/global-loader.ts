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
	GlobalInstanceNotInitializedError,
} from "./errors";

// Global key for injecting the global instance during loading
// This is necessary because jiti loads files in a separate context,
// and we need a way to pass the global instance to the extension shim
const GLOBAL_INSTANCE_KEY = "__STYLEFRAME_GLOBAL_INSTANCE__";

// Extension shim path - created once per process
let extensionShimPath: string | null = null;

/**
 * Get or create the extension shim file.
 * The shim reads the global instance from globalThis and exports it.
 */
function getExtensionShimPath(): string {
	if (extensionShimPath && fs.existsSync(extensionShimPath)) {
		return extensionShimPath;
	}

	const shimContent = `
export function styleframe() {
	const instance = globalThis["${GLOBAL_INSTANCE_KEY}"];
	if (!instance) {
		throw new Error('[styleframe] Global instance not available during loading');
	}
	return instance;
}

export default { styleframe };
`;

	const tempDir = os.tmpdir();
	extensionShimPath = path.join(tempDir, `styleframe-shim-${process.pid}.mjs`);
	fs.writeFileSync(extensionShimPath, shimContent);

	return extensionShimPath;
}

/**
 * Load the config file and initialize the global instance
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
	state.globalInstance = instance;

	// Track named exports from config
	trackModuleExports(state, module, state.configPath);

	return instance;
}

/**
 * Load a single *.styleframe.ts file using the global instance
 */
export async function loadStyleframeFile(
	state: PluginGlobalState,
	filePath: string,
	loadOrder: number,
): Promise<void> {
	if (!state.globalInstance) {
		throw new GlobalInstanceNotInitializedError();
	}

	// Circular dependency detection
	if (state.loadingFiles.has(filePath)) {
		throw new CircularDependencyError(filePath, [...state.loadingFiles]);
	}

	state.loadingFiles.add(filePath);

	try {
		// Clear previous exports from this file (for HMR)
		clearFileExports(state, filePath);

		// Set the global instance on globalThis for the extension shim to access
		(globalThis as Record<string, unknown>)[GLOBAL_INSTANCE_KEY] =
			state.globalInstance;

		const jiti = createJiti(path.dirname(filePath), {
			fsCache: false,
			moduleCache: false,
			alias: {
				"virtual:styleframe": getExtensionShimPath(),
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
		delete (globalThis as Record<string, unknown>)[GLOBAL_INSTANCE_KEY];
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
		const file = files[i];
		if (file) {
			await loadStyleframeFile(state, file, i);
		}
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
