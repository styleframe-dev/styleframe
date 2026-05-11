import type { StyleframeOptions } from "@styleframe/core";

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
	consumers?: {
		css: ConsumeFunction;
		ts: ConsumeFunction;
		dts: ConsumeFunction;
	};
};
