import type { ShorteningMap, StyleframeOptions } from "@styleframe/core";

export type OutputFile = {
	name: string;
	content: string;
};

export type Output = {
	files: OutputFile[];
};

export type TranspileContext = {
	treeshake?: boolean;
	scanner?: boolean;
	shortMap?: ShorteningMap;
};

export type ConsumeFunction = (
	instance: unknown,
	options: StyleframeOptions,
	context?: TranspileContext,
) => string;

export type TranspileOptions = {
	type?: "css" | "ts" | "dts" | "all";
	treeshake?: boolean;
	scanner?: boolean;
	minify?: boolean;
	minifyDefaults?: {
		properties?: Record<string, string>;
		values?: Record<string, string>;
		modifiers?: Record<string, string>;
	};
	consumers?: {
		css: ConsumeFunction;
		ts: ConsumeFunction;
		dts: ConsumeFunction;
	};
};
