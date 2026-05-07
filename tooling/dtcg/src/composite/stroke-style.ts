import { isStrokeStyleValue } from "../guards/values";
import type { DTCGStrokeStyle } from "../types/composite";

export function parse(value: unknown): DTCGStrokeStyle | undefined {
	return isStrokeStyleValue(value) ? value : undefined;
}

export function format(value: DTCGStrokeStyle): string {
	return typeof value === "string" ? value : JSON.stringify(value);
}
