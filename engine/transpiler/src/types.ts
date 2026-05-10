import type { StyleframeOptions } from "@styleframe/core";

export type OutputFile = {
	name: string;
	content: string;
};

export type Output = {
	files: OutputFile[];
};

export type TranspileContext = {
	purge?: boolean;
	scanner?: boolean;
};

export type ConsumeFunction = (
	instance: unknown,
	options: StyleframeOptions,
	context?: TranspileContext,
) => string;

export type TranspileOptions = {
	type?: "css" | "ts" | "dts" | "all";
	purge?: boolean;
	scanner?: boolean;
	consumers?: {
		css: ConsumeFunction;
		ts: ConsumeFunction;
		dts: ConsumeFunction;
	};
};
