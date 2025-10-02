import { isVariable } from "../typeGuards";
import type { Container, Reference, Root, Variable } from "../types";

export function createRefFunction(_parent: Container, _root: Root) {
	return function ref<Name extends string>(
		variable: Variable<Name> | Name,
		fallback?: string,
	): Reference<Name> {
		if (isVariable(variable)) {
			return {
				type: "reference",
				name: variable.name,
				fallback,
			};
		}

		// If a string name is passed, use it directly
		return {
			type: "reference",
			name: variable,
			fallback,
		};
	};
}
