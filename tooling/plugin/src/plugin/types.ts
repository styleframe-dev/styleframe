import type { TranspileOptions } from "@styleframe/transpiler";
import type { Extractor, ScannerUtilitiesConfig } from "@styleframe/scanner";

export interface Options {
	/** Entry file for the global config (default: './styleframe.config.ts') */
	entry?: string;
	/** Suppress console output */
	silent?: boolean;
	/** Transpiler options */
	transpiler?: TranspileOptions;
	/** Glob patterns for *.styleframe.ts files (default: ['**\/*.styleframe.ts']) */
	include?: string[];
	/** Glob patterns to exclude (default: node_modules, dist, etc.) */
	exclude?: string[];
	/** File loading order strategy (default: 'alphabetical') */
	loadOrder?: "alphabetical" | "depth-first";
	/** Type declaration generation options */
	dts?: {
		/** Enable type declaration generation (default: true) */
		enabled?: boolean;
		/** Output directory for generated types (default: ".styleframe") */
		outDir?: string;
	};
	/** Scanner options for auto-detecting utility classes in content files */
	scanner?: {
		/** Glob patterns for content files to scan for utility class names */
		content: string[];
		/** Custom extractor functions for file types not supported by default */
		extractors?: Extractor[];
		/** Custom utility class syntax configuration */
		utilities?: ScannerUtilitiesConfig;
	};
}
