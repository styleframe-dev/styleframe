import { isTransitionValue } from "../guards/values";
import type { DTCGTransition } from "../types/composite";

export function parse(value: unknown): DTCGTransition | undefined {
	return isTransitionValue(value) ? value : undefined;
}

export function format(value: DTCGTransition): string {
	return JSON.stringify(value);
}
