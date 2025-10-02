import { genSafeVariableName } from "./genSafeVariableName";

export function genReferenceVariable(name: string, fallback?: string): string {
	return `var(${genSafeVariableName(name)}${fallback ? `, ${fallback}` : ""})`;
}
