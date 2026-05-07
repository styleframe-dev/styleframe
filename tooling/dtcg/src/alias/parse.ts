import type { DTCGAlias } from "../types/alias";

/**
 * Strip the surrounding braces from an alias string. The caller is
 * responsible for ensuring the input is a valid alias (use `isAlias`).
 *
 * @example parseAlias("{color.primary}") // → "color.primary"
 */
export function parseAlias(alias: DTCGAlias): string {
	return alias.slice(1, -1);
}

/**
 * Wrap a path string in DTCG alias braces.
 *
 * @example formatAlias("color.primary") // → "{color.primary}"
 */
export function formatAlias(path: string): DTCGAlias {
	return `{${path}}`;
}
