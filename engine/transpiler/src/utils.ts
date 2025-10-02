import { DEFAULT_INDENT } from "./constants";

export function addIndentToLine(line: string): string {
	return `${DEFAULT_INDENT}${line}`;
}

export function indentLines(lines: string): string {
	return lines
		.split("\n")
		.map((line) => addIndentToLine(line))
		.join("\n");
}
