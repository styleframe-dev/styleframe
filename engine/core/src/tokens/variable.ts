import type { Container, Root, TokenValue, Variable } from "../types";

export function createVariableFunction(parent: Container, _root: Root) {
	return function variable<Name extends string>(
		target: Name | Variable<Name>,
		value: TokenValue,
		options: {
			default: boolean;
		} = {
			default: false,
		},
	): Variable<Name> {
		const name = (typeof target === "string" ? target : target.name) as Name;

		const existingVariable = parent.variables.find(
			(child) => child.name === name,
		) as Variable<Name> | undefined;

		// If default is true and the variable exists, return existing
		if (options.default && existingVariable) {
			return existingVariable;
		}

		// If default is false and the variable exists, update the value
		if (existingVariable) {
			existingVariable.value = value;
			return existingVariable;
		}

		// Create a new variable
		const instance: Variable<Name> = {
			type: "variable",
			name,
			value,
		};

		parent.variables.push(instance);
		return instance;
	};
}
