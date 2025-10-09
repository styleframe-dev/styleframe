import { DEFAULT_INDENT } from "./constants";
import { kebabCase } from "scule";
import type { KebabCase } from "scule";

export function addIndentToLine(line: string): string {
	return `${DEFAULT_INDENT}${line}`;
}

export function indentLines(lines: string): string {
	return lines
		.split("\n")
		.map((line) => addIndentToLine(line))
		.join("\n");
}

export function toKebabCase<S extends string>(str: S): KebabCase<S> {
	return kebabCase(str);
}
