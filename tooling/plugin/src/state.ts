import type { Styleframe } from "@styleframe/core";
import { ExportCollisionError } from "./errors";

/**
 * Information about a discovered *.styleframe.ts file
 */
export interface StyleframeFileInfo {
	/** Absolute path to the file */
	path: string;
	/** Order in which file was loaded (for deterministic variable precedence) */
	loadOrder: number;
	/** Named exports from this file */
	exports: Map<string, ExportInfo>;
	/** Last modification timestamp */
	lastModified: number;
}

/**
 * Information about an exported recipe or selector
 */
export interface ExportInfo {
	/** Export name (e.g., "buttonRecipe") */
	name: string;
	/** Type of export */
	type: "recipe" | "selector";
	/** Source file path */
	source: string;
}

/**
 * Global state for the plugin
 */
export interface PluginGlobalState {
	/** The shared styleframe instance (from config) */
	sharedInstance: Styleframe | null;
	/** Path to the config file */
	configPath: string;
	/** All discovered *.styleframe.ts files (ordered by load order) */
	styleframeFiles: Map<string, StyleframeFileInfo>;
	/** Aggregated exports with collision detection */
	aggregatedExports: Map<string, ExportInfo>;
	/** Files currently being loaded (for circular dependency detection) */
	loadingFiles: Set<string>;
	/** Whether initial discovery has completed */
	initialized: boolean;
}

/**
 * Create a new plugin state instance
 */
export function createPluginState(configPath: string): PluginGlobalState {
	return {
		sharedInstance: null,
		configPath,
		styleframeFiles: new Map(),
		aggregatedExports: new Map(),
		loadingFiles: new Set(),
		initialized: false,
	};
}

/**
 * Register an export from a styleframe file.
 * Throws ExportCollisionError if the same name is exported from different files.
 */
export function registerExport(
	state: PluginGlobalState,
	info: ExportInfo,
): void {
	const existing = state.aggregatedExports.get(info.name);

	// Allow re-registration from the same file (for HMR)
	if (existing && existing.source !== info.source) {
		throw new ExportCollisionError(info.name, existing.source, info.source);
	}

	state.aggregatedExports.set(info.name, info);
}

/**
 * Clear all exports from a specific file.
 * Used during HMR to remove stale exports before reloading.
 */
export function clearFileExports(
	state: PluginGlobalState,
	filePath: string,
): void {
	// Remove all exports from this file
	for (const [name, info] of state.aggregatedExports) {
		if (info.source === filePath) {
			state.aggregatedExports.delete(name);
		}
	}

	// Clear the file's export tracking
	const fileInfo = state.styleframeFiles.get(filePath);
	if (fileInfo) {
		fileInfo.exports.clear();
	}
}

/**
 * Reset all state (used when config changes)
 */
export function resetState(state: PluginGlobalState): void {
	state.sharedInstance = null;
	state.styleframeFiles.clear();
	state.aggregatedExports.clear();
	state.loadingFiles.clear();
	state.initialized = false;
}
