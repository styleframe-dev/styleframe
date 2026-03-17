import type { Container, Root, TokenValue, Variable } from "../types";
import { resolvePropertyValue } from "./resolve";
import { createRefFunction } from "./ref";

export function createVariableFunction(parent: Container, _root: Root) {
	return function variable<Name extends string>(
		nameOrInstance: Name | Variable<Name>,
		value: TokenValue,
		options: {
			default: boolean;
		} = {
			default: false,
		},
	): Variable<Name> {
		const name = (
			typeof nameOrInstance === "string" ? nameOrInstance : nameOrInstance.name
		) as Name;

		// Resolve @-prefixed string values to references
		const ref = createRefFunction(parent, _root);
		const resolvedValue = resolvePropertyValue(value, ref, _root);

		const existingVariable = parent.variables.find(
			(child) => child.name === name,
		) as Variable<Name> | undefined;

		// If default is true and the variable exists, return existing
		if (options.default && existingVariable) {
			return existingVariable;
		}

		// If default is false and the variable exists, update the value
		if (existingVariable) {
			existingVariable.value = resolvedValue;
			return existingVariable;
		}

		// Create a new variable
		const instance: Variable<Name> = {
			type: "variable",
			name,
			value: resolvedValue,
		};

		parent.variables.push(instance);
		return instance;
	};
}
