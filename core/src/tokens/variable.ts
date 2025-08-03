import { isVariable } from "../typeGuards";
import type { Root, Selector, TokenValue, Variable } from "../types";

export function createVariableFunction(root: Root | Selector) {
	return function variable<Name extends string>(
		name: Name,
		value: TokenValue,
		options: {
			default: boolean;
		} = {
			default: false,
		},
	): Variable<Name> {
		const existingVariable = root.declarations
			.filter(isVariable<Name>)
			.find((child) => child.name === name);

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

		root.declarations.push(instance);
		return instance;
	};
}
