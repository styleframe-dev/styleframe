import type { DTCGAnyToken, DTCGDocument, DTCGGroup } from "../types/token";

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Tokens are objects with a `$value` property. Arrays and primitives are not
 * tokens even when they happen to be valid DTCG values.
 */
export function isToken(value: unknown): value is DTCGAnyToken {
	return isPlainObject(value) && "$value" in value;
}

/**
 * Groups are plain objects without a `$value`. The root document is
 * structurally a group, but `isDocument` is the more specific check.
 */
export function isGroup(value: unknown): value is DTCGGroup {
	return isPlainObject(value) && !("$value" in value);
}

/**
 * Documents look identical to groups — `isDocument` is provided for
 * readability at API boundaries.
 */
export function isDocument(value: unknown): value is DTCGDocument {
	return isGroup(value);
}
