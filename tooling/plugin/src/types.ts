import type { TranspileOptions } from "@styleframe/transpiler";

export interface Options {
	entry?: string | string[];
	silent?: boolean;
	transpiler?: TranspileOptions;
}
