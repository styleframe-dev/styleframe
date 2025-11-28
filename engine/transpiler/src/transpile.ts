import type { Styleframe } from "@styleframe/core";
import {
	isInstanceLicenseRequired,
	getInstanceLicenseValidationInfo,
} from "@styleframe/license";
import { consume as consumeCSS } from "./consume/css";
import { consume as consumeTS } from "./consume/ts";
import { addLicenseWatermark } from "./license";
import type { Output, OutputFile, TranspileOptions } from "./types";

export function createFile(name: string, content: string = ""): OutputFile {
	return {
		name,
		content,
	};
}

export async function transpile(
	instance: Styleframe,
	{
		type = "all",
		consumers = { css: consumeCSS, ts: consumeTS },
	}: TranspileOptions = {},
): Promise<Output> {
	const output: Output = { files: [] };
	const options = instance.options;

	if (isInstanceLicenseRequired(instance)) {
		const validationInfo = await getInstanceLicenseValidationInfo(instance);
		if (!validationInfo.valid || validationInfo.instanceId !== instance.id) {
			addLicenseWatermark(instance);
		}
	}

	if (type === "all" || type === "css") {
		const indexFile = createFile(
			"index.css",
			consumers.css(instance.root, options),
		);
		output.files.push(indexFile);
	}

	if (type === "all" || type === "ts") {
		const indexFile = createFile(
			"index.ts",
			consumers.ts(instance.root, options),
		);
		output.files.push(indexFile);
	}

	return output;
}
