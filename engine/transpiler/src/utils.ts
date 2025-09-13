import type { StyleframeOptions } from "@styleframe/core";
import { DEFAULT_INDENT } from "./constants";

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
