import type { Styleframe } from "@styleframe/core";

/**
 * Export information for a recipe or selector
 */
export interface ExportInfo {
	/** Export name (e.g., "buttonRecipe") */
	name: string;
	/** Type of export */
	type: "recipe" | "selector";
}

/**
 * Options for loading a module with jiti
 */
export interface LoadModuleOptions {
	/** jiti alias configuration (e.g., for virtual modules) */
	alias?: Record<string, string>;
	/** Whether to validate that default export is a Styleframe instance (default: true) */
	validateInstance?: boolean;
}

/**
 * Result of loading a module
 */
export interface LoadModuleResult {
	/** The raw module exports */
	module: Record<string, unknown>;
	/** The default export (Styleframe instance) */
	instance: Styleframe;
	/** Tracked exports (recipes and selectors with _exportName set) */
	exports: Map<string, ExportInfo>;
}

/**
 * Result of loading an extension module (no instance validation)
 */
export interface LoadExtensionModuleResult {
	/** The raw module exports */
	module: Record<string, unknown>;
	/** Tracked exports (recipes and selectors with _exportName set) */
	exports: Map<string, ExportInfo>;
}
