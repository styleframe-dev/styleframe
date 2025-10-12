import type { TokenValue, Variable } from "@styleframe/core";
import type { CamelCase } from "scule";

/**
 * Helper type to compute the variable name for a given prefix and key
 */
type ExportKeyVariableName<
	Prefix extends string,
	K,
	Separator extends string = "--",
> = K extends "default" ? Prefix : `${Prefix}${Separator}${string & K}`;

/**
 * Generic type that transforms keys to their export names with a given prefix
 *
 * @example
 * ExportKeys<"example-property", { "default": "...", "variant": "..." }> -> {
 * 		"exampleProperty": Variable<'example-property'>,
 * 		"examplePropertyVariant": Variable<'example-property--variant'>,
 * }
 */
export type ExportKeys<
	Prefix extends string,
	T extends Record<string, TokenValue>,
	Separator extends string = "--",
> = {
	[K in keyof T as CamelCase<
		ExportKeyVariableName<Prefix, K, Separator>
	>]: Variable<ExportKeyVariableName<Prefix, K, Separator>>;
};
