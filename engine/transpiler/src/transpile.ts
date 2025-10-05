import type { Styleframe } from "@styleframe/core";
import { consume } from "./consume";
import type { Output, OutputFile } from "./types";

export function createFile(name: string, content: string = ""): OutputFile {
	return {
		name,
		content,
	};
}

export function transpile(instance: Styleframe): Output {
	const output: Output = { files: [] };
	const options = instance.options;

	const indexFile = createFile("index.css", consume(instance.root, options));

	output.files.push(indexFile);

	return output;
}
