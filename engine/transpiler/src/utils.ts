import { DEFAULT_INDENT } from "./constants";

export function normalizeVariableName(name: string): string {
	const variableName = name.startsWith("--") ? name : `--${name}`;
	return variableName
		.replace(/([0-9])\.([0-9])/g, "$1_$2")
		.replace(/\./g, "--");
}

export function addDefaultIndentToLine(string: string): string {
	return `${DEFAULT_INDENT}${string}`;
}

export function indentLines(string: string): string {
	return string.split("\n").map(addDefaultIndentToLine).join("\n");
}
