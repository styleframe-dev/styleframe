import { isKeyframes, isVariable } from "../typeGuards";
import type { Container, Keyframes, Reference, Root, Variable } from "../types";

export function createRefFunction(parent: Container, _root: Root) {
	return function ref<Name extends string>(
		variableOrKeyframes: Variable<Name> | Keyframes<Name> | Name,
		fallback?: string,
	): Reference<Name> {
		if (isVariable(variableOrKeyframes) || isKeyframes(variableOrKeyframes)) {
			return {
				type: "reference",
				name: variableOrKeyframes.name,
				fallback,
			};
		}

		// If a string name is passed, use it directly
		return {
			type: "reference",
			name: variableOrKeyframes,
			fallback,
		};
	};
}
