import type { Styleframe } from "@styleframe/core";
import {
	createLoader,
	loadExtensionModule,
	loadModule,
	type ExportInfo,
} from "@styleframe/loader";
import type { Jiti } from "jiti";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { PluginGlobalState } from "./state";
import { findExportCollision, resetState } from "./state";
import {
	CircularDependencyError,
	ExportCollisionError,
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
 * Check exports for collisions and throw if found.
 */
function checkExportCollisions(
	state: PluginGlobalState,
	exports: Map<string, ExportInfo>,
	filePath: string,
): void {
	for (const [name] of exports) {
		const collision = findExportCollision(state, name, filePath);
		if (collision) {
			throw new ExportCollisionError(name, collision, filePath);
		}
	}
}

/**
 * Load the config file and initialize the global instance
 */
export async function loadConfigFile(
	state: PluginGlobalState,
	sharedJiti?: Jiti,
): Promise<Styleframe> {
	if (!state.configFile) {
		throw new Error("[styleframe] Config file not set");
	}

	const configPath = state.configFile.path;

	// Use shared loadModule function
	const { instance, exports } = await loadModule(configPath, {
		alias: state.resolve.alias,
		jiti: sharedJiti,
	});

	// Check for collisions
	checkExportCollisions(state, exports, configPath);

	state.globalInstance = instance;
	state.configFile.exports = exports;
	state.configFile.lastModified = Date.now();

	return instance;
}

/**
 * Load a single *.styleframe.ts file using the global instance
 */
export async function loadStyleframeFile(
	state: PluginGlobalState,
	filePath: string,
	loadOrder: number,
	sharedJiti?: Jiti,
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
		// Set the global instance on globalThis for the extension shim to access
		(globalThis as Record<string, unknown>)[GLOBAL_INSTANCE_KEY] =
			state.globalInstance;

		// Use shared loadExtensionModule function with alias for virtual:styleframe
		const { exports } = await loadExtensionModule(filePath, {
			alias: {
				...state.resolve.alias,
				"virtual:styleframe": getExtensionShimPath(),
			},
			jiti: sharedJiti,
		});

		// Check for collisions
		checkExportCollisions(state, exports, filePath);

		// Update file info
		state.files.set(filePath, {
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
	sharedJiti?: Jiti,
): Promise<void> {
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		if (file) {
			await loadStyleframeFile(state, file, i, sharedJiti);
		}
	}
}

/**
 * Reload the config and all styleframe files.
 * If reload fails, restores the previous state so the app continues working.
 */
export async function reloadAll(
	state: PluginGlobalState,
	files: string[],
): Promise<void> {
	// Save current state before resetting, so we can restore on failure
	const previousGlobalInstance = state.globalInstance;
	const previousConfigExports = state.configFile
		? new Map(state.configFile.exports)
		: null;
	const previousConfigLastModified = state.configFile?.lastModified ?? 0;
	const previousFiles = new Map(state.files);

	// Create a single shared Jiti instance for this reload cycle
	// to avoid creating a new instance per file.
	const sharedJiti = createLoader(process.cwd(), {
		...state.resolve.alias,
		"virtual:styleframe": getExtensionShimPath(),
	});

	// Clear all state except configPath
	resetState(state);

	try {
		// Reload config
		await loadConfigFile(state, sharedJiti);

		// Reload all files
		await loadAllStyleframeFiles(state, files, sharedJiti);
	} catch (error) {
		// Restore previous state so the app continues working
		state.globalInstance = previousGlobalInstance;
		if (state.configFile && previousConfigExports) {
			state.configFile.exports = previousConfigExports;
			state.configFile.lastModified = previousConfigLastModified;
		}
		for (const [filePath, fileInfo] of previousFiles) {
			state.files.set(filePath, fileInfo);
		}
		state.initialized = previousGlobalInstance !== null;

		throw error;
	}
}
