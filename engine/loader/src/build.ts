import { writeFile, mkdir, rm } from "fs/promises";
import type { Styleframe } from "@styleframe/core";
import { transpile } from "@styleframe/transpiler";
import { directoryExists } from "./utils";
import path from "path";

export type BuildOptions = {
	clean?: boolean;
	outputDir?: string;
};

export async function build(
	instance: Styleframe,
	{ clean = true, outputDir = "./styleframe" }: BuildOptions = {},
) {
	const output = transpile(instance);

	if (clean) {
		await rm(outputDir, { recursive: true });
	}

	for (const file of output.files) {
		const filePath = path.join(outputDir, file.name);

		const fileOutputDirPath = path.dirname(filePath);
		if (fileOutputDirPath && !(await directoryExists(fileOutputDirPath))) {
			await mkdir(fileOutputDirPath, { recursive: true });
		}

		await writeFile(filePath, file.content);
	}
}
