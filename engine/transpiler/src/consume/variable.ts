/**
 * Consumes a variable instance, equivalent to setting a CSS variable
 */

import type { StyleframeOptions, Variable } from "@styleframe/core";
import type { ConsumeFunction } from "../types";
import { defaultVariableNameFn } from "../defaults";

export function createVariableConsumer(consume: ConsumeFunction) {
	return function consumeVariable(
		instance: Variable,
		options: StyleframeOptions,
	): string {
		const variableNameFn = options.variables?.name ?? defaultVariableNameFn;
		const variableName = variableNameFn({ name: instance.name });

		return `${variableName}: ${consume(instance.value, options)};`;
	};
}
