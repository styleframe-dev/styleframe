import { isTypographyValue } from "../guards/values";
import type { DTCGTypography } from "../types/composite";

export function parse(value: unknown): DTCGTypography | undefined {
	return isTypographyValue(value) ? value : undefined;
}

export function format(value: DTCGTypography): string {
	return JSON.stringify(value);
}
