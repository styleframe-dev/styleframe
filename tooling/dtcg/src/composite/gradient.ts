import { isGradientValue } from "../guards/values";
import type { DTCGGradient } from "../types/composite";

export function parse(value: unknown): DTCGGradient | undefined {
	return isGradientValue(value) ? value : undefined;
}

export function format(value: DTCGGradient): string {
	return JSON.stringify(value);
}
