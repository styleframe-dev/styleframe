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
