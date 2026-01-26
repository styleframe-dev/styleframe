import type { DTCGAliasValue } from "./types";
import { isDTCGAlias } from "./types";

/**
 * Parse a DTCG alias string to get the referenced path
 * @example "{color.primary}" → "color.primary"
 */
export function parseAlias(alias: DTCGAliasValue): string {
	return alias.slice(1, -1);
}

/**
 * Create a DTCG alias string from a token path
 * @example "color.primary" → "{color.primary}"
 */
export function createAlias(path: string): DTCGAliasValue {
	// Ensure path uses dot notation
	const dotPath = path.replace(/\//g, ".");
	return `{${dotPath}}` as DTCGAliasValue;
}

/**
 * Convert Figma slash notation to DTCG dot notation
 * @example "color/primary" → "color.primary"
 */
export function figmaPathToDTCG(figmaPath: string): string {
	return figmaPath.replace(/\//g, ".");
}

/**
 * Convert DTCG dot notation to Figma slash notation
 * @example "color.primary" → "color/primary"
 */
export function dtcgPathToFigma(dtcgPath: string): string {
	return dtcgPath.replace(/\./g, "/");
}

/**
 * Check if a value is an alias and resolve it to Figma format
 */
export function resolveAliasForFigma(value: unknown): {
	isAlias: boolean;
	target?: string;
} {
	if (isDTCGAlias(value)) {
		const path = parseAlias(value);
		return { isAlias: true, target: dtcgPathToFigma(path) };
	}
	return { isAlias: false };
}

/**
 * Get the segments of a token path
 * @example "color.primary.500" → ["color", "primary", "500"]
 */
export function getPathSegments(path: string): string[] {
	return path.split(/[./]/);
}

/**
 * Join path segments into a DTCG path
 * @example ["color", "primary", "500"] → "color.primary.500"
 */
export function joinPath(segments: string[]): string {
	return segments.join(".");
}
