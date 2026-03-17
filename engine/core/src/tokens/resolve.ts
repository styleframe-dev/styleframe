import { isKeyReferenceValue, isRef } from "../typeGuards";
import type { CSS, Reference, TokenValue } from "../types";

export type RefFunction = (variable: string, fallback?: string) => Reference;

const AT_VARIABLE_REGEX = /@([\w.-]+)/g;

export function parseAtReferences(str: string, ref: RefFunction): TokenValue[] {
	const parts: TokenValue[] = [];
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	AT_VARIABLE_REGEX.lastIndex = 0;
	while ((match = AT_VARIABLE_REGEX.exec(str)) !== null) {
		parts.push(str.slice(lastIndex, match.index));
		parts.push(ref(match[1] as string));
		lastIndex = AT_VARIABLE_REGEX.lastIndex;
	}
	parts.push(str.slice(lastIndex));

	return parts;
}

/**
 * Resolves @-prefixed variable references in string values.
 * - Exact match "@name" → Reference object
 * - Embedded "1px solid @name" → CSS object with mixed parts
 * - Non-string or no @ → returns value unchanged
 */
export function resolvePropertyValue(
	value: TokenValue,
	ref: RefFunction,
): TokenValue {
	if (typeof value !== "string" || !value.includes("@")) {
		return value;
	}

	// Exact match: "@color.primary" → direct Reference (single @name, no extra content)
	if (isKeyReferenceValue(value) && /^@[\w.-]+$/.test(value)) {
		return ref(value.slice(1));
	}

	// Embedded: "1px solid @color.primary" → CSS object
	const parts = parseAtReferences(value, ref);
	const hasReferences = parts.some((p) => isRef(p));
	if (hasReferences) {
		return { type: "css", value: parts } as CSS;
	}

	return value;
}
