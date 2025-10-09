import { toKebabCase } from "../utils";

export function genSafePropertyName(name: string): string {
	return toKebabCase(name);
}
