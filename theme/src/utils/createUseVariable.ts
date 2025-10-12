import type { Styleframe, TokenValue, Variable } from "@styleframe/core";
import type { CamelCase } from "scule";
import { camelCase } from "scule";
import type { ExportKeys } from "../types";

/**
 * Creates a generic composable function for a CSS property.
 *
 * This factory function generates `use*` composables (like `useFontFamily`, `useLineHeight`, etc.)
 * from a CSS property name string.
 *
 * @param propertyName - The CSS property name (e.g., 'font-family', 'line-height')
 * @returns A composable function that creates variables for the given property
 *
 * @example
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { createUseVariable } from "styleframe/theme";
 *
 * // Create a useFontFamily composable
 * const useFontFamily = createUseVariable("font-family");
 *
 * const s = styleframe();
 * const { fontFamily, fontFamilyMono } = useFontFamily(s, {
 *   default: "Arial, sans-serif",
 *   mono: "Courier, monospace",
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a useLineHeight composable
 * const useLineHeight = createUseVariable("line-height");
 *
 * const s = styleframe();
 * const { lineHeight, lineHeightTight, lineHeightLoose } = useLineHeight(s, {
 *   default: "1.5",
 *   tight: "1.25",
 *   loose: "1.75",
 * });
 * ```
 */
export function createUseVariable<
	PropertyName extends string,
	Delimiter extends string = "--",
>(
	propertyName: PropertyName,
	propertyValueFn: (value: TokenValue) => TokenValue = (value) => value,
	delimiter: Delimiter = "--" as Delimiter,
) {
	return function useVariable<T extends Record<string, TokenValue>>(
		s: Styleframe,
		tokens: T,
	): ExportKeys<PropertyName, T, Delimiter> {
		const result: Record<string, Variable<string>> = {};

		for (const [key, value] of Object.entries(tokens)) {
			const variableName =
				`${propertyName}${key === "default" ? "" : `${delimiter}${key}`}` as const;
			const exportName: CamelCase<typeof variableName> =
				camelCase(variableName);
			const variableValue = propertyValueFn(value);

			result[exportName] = s.variable(variableName, variableValue, {
				default: true,
			});
		}

		return result as ExportKeys<PropertyName, T, Delimiter>;
	};
}
