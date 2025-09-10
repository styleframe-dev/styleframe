import { isVariable } from "../typeGuards";
import type { Container, Reference, Root, Variable } from "../types";

export function createRefFunction(_parent: Container, _root: Root) {
	return function ref<Name extends string>(
		variableOrKeyframes: Variable<Name> | Name,
		fallback?: string,
	): Reference<Name> {
		if (isVariable(variableOrKeyframes)) {
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
