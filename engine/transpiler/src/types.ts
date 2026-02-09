import type { StyleframeOptions } from "@styleframe/core";

export type OutputFile = {
	name: string;
	content: string;
};

export type Output = {
	files: OutputFile[];
};

export type ConsumeFunction = (
	instance: unknown,
	options: StyleframeOptions,
) => string;

export type TranspileOptions = {
	type?: "css" | "ts" | "dts" | "all";
	consumers?: {
		css: ConsumeFunction;
		ts: ConsumeFunction;
		dts: ConsumeFunction;
	};
};
