import { isKeyReferenceValue, isRef } from "../typeGuards";
import type { CSS, Container, Reference, Root, TokenValue } from "../types";

export type RefFunction = (variable: string, fallback?: string) => Reference;

const AT_VARIABLE_REGEX = /@([\w.-]+)/g;

export function parseAtReferences(str: string): TokenValue[] {
	const parts: TokenValue[] = [];
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	AT_VARIABLE_REGEX.lastIndex = 0;
	while ((match = AT_VARIABLE_REGEX.exec(str)) !== null) {
		parts.push(str.slice(lastIndex, match.index));
		parts.push({ type: "reference", name: match[1] as string } as Reference);
		lastIndex = AT_VARIABLE_REGEX.lastIndex;
	}
	parts.push(str.slice(lastIndex));

	return parts;
}

/**
 * Checks whether a variable with the given name exists in the scope chain,
 * walking from the given scope up through ancestors via parentId.
 */
export function findVariableInScope(
	name: string,
	scope: Container,
	root: Root,
): boolean {
	let current: Container | Root | undefined = scope;
	while (current) {
		if (current.variables.some((v) => v.name === name)) {
			return true;
		}

		if (current.parentId) {
			current = root._registry.get(current.parentId);
		} else {
			break;
		}
	}

	return false;
}

/**
 * Validates that a variable name exists in the scope chain.
 * Walks from the given scope up through ancestors to root.
 * Throws if the variable is not defined.
 */
export function validateReference(
	name: string,
	scope: Container,
	root: Root,
): void {
	if (!findVariableInScope(name, scope, root)) {
		throw new Error(
			`[styleframe] Variable "${name}" is not defined. Check that the variable exists before referencing it with "@${name}".`,
		);
	}
}

/**
 * Creates a resolver that converts @-prefixed variable references in string values.
 * - Exact match "@name" → Reference object
 * - Embedded "1px solid @name" → CSS object with mixed parts
 * - Non-string or no @ → returns value unchanged
 */
export function createPropertyValueResolver(parent: Container, root: Root) {
	return function resolvePropertyValue(value: TokenValue): TokenValue {
		if (typeof value !== "string" || !value.includes("@")) {
			return value;
		}

		// Exact match: "@color.primary" → direct Reference (single @name, no extra content)
		if (isKeyReferenceValue(value) && /^@[\w.-]+$/.test(value)) {
			const name = value.slice(1);
			validateReference(name, parent, root);
			return { type: "reference", name: name } as Reference;
		}

		// Embedded: "1px solid @color.primary" → CSS object
		const parts = parseAtReferences(value);
		const hasReferences = parts.some((p) => isRef(p));
		if (hasReferences) {
			return { type: "css", value: parts } as CSS;
		}

		return value;
	};
}
