import type { Styleframe } from "@styleframe/core";
import { consumeCSS, consumeTS } from "./consume";
import type { Output, OutputFile, TranspileOptions } from "./types";

export function createFile(name: string, content: string = ""): OutputFile {
	return {
		name,
		content,
	};
}

export function transpile(
	instance: Styleframe,
	{
		type = "all",
		consumers = { css: consumeCSS, ts: consumeTS },
	}: TranspileOptions = {},
): Output {
	const output: Output = { files: [] };
	const options = instance.options;
	const { recipes, ...root } = instance.root;

	if (type === "all" || type === "css") {
		const indexFile = createFile("index.css", consumers.css(root, options));
		output.files.push(indexFile);
	}

	if (type === "all" || type === "ts") {
		const indexFile = createFile("index.ts", consumers.ts([], options));
		output.files.push(indexFile);
	}

	return output;
}
