import type { DTCGDimension } from "../types/dimension";

/**
 * Serialize a DTCG dimension as `${value}${unit}` (e.g. `"16px"`).
 */
export function format(dimension: DTCGDimension): string {
	return `${dimension.value}${dimension.unit}`;
}
