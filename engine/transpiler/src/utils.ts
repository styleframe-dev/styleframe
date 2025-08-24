import type { StyleframeOptions } from "@styleframe/core";
import { DEFAULT_INDENT } from "./constants";

export function normalizeVariableName(
	name: string,
	options: StyleframeOptions,
): string {
	const prefix = options.variables?.prefix ?? "";
	const prefixedName = `${prefix}${name}`;
	const variableName = `${prefixedName.startsWith("--") ? prefixedName : `--${prefixedName}`}`;
	return variableName
		.replace(/([0-9])\.([0-9])/g, "$1_$2")
		.replace(/\./g, "--");
}

export function addIndentToLine(
	line: string,
	options: StyleframeOptions,
): string {
	return `${options.indent ?? DEFAULT_INDENT}${line}`;
}

export function indentLines(lines: string, options: StyleframeOptions): string {
	return lines
		.split("\n")
		.map((line) => addIndentToLine(line, options))
		.join("\n");
}
