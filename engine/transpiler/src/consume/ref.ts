import type { Reference, StyleframeOptions } from "@styleframe/core";
import type { ConsumeFunction } from "../types";
import { defaultVariableNameFn } from "../defaults";

/**
 * Consumes a ref instance, equivalent to referencing a CSS variable with optional fallback
 */
export function createRefConsumer(consume: ConsumeFunction) {
	return function consumeRef(
		instance: Reference,
		options: StyleframeOptions,
	): string {
		const variableNameFn = options.variables?.name ?? defaultVariableNameFn;
		const variableName = variableNameFn({ name: instance.name });

		return `var(${variableName}${instance.fallback ? `, ${consume(instance.fallback, options)}` : ""})`;
	};
}
