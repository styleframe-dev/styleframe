import type { TranspileOptions } from "@styleframe/transpiler";

export interface Options {
	/** Entry file(s) for the global config (default: './styleframe.config.ts') */
	entry?: string | string[];
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
}
