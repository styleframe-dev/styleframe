import { isShadowValue } from "../guards/values";
import type { DTCGShadow } from "../types/composite";

export function parse(value: unknown): DTCGShadow | undefined {
	return isShadowValue(value) ? value : undefined;
}

export function format(value: DTCGShadow): string {
	return JSON.stringify(value);
}
