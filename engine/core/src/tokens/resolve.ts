import { isKeyReferenceValue, isRef } from "../typeGuards";
import type { CSS, Reference, Root, TokenValue } from "../types";

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
 * Validates that a variable name exists in root.variables.
 * Throws if the variable is not defined.
 */
export function validateReference(name: string, root: Root): void {
	if (!root.variables.some((v) => v.name === name)) {
		throw new Error(
			`[styleframe] Variable "${name}" is not defined. Check that the variable exists before referencing it with "@${name}".`,
		);
	}
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
	root?: Root,
): TokenValue {
	if (typeof value !== "string" || !value.includes("@")) {
		return value;
	}

	// Exact match: "@color.primary" → direct Reference (single @name, no extra content)
	if (isKeyReferenceValue(value) && /^@[\w.-]+$/.test(value)) {
		const name = value.slice(1);
		if (root) {
			validateReference(name, root);
		}
		return ref(name);
	}

	// Embedded: "1px solid @color.primary" → CSS object
	const parts = parseAtReferences(value, ref);
	const hasReferences = parts.some((p) => isRef(p));
	if (hasReferences) {
		return { type: "css", value: parts } as CSS;
	}

	return value;
}
