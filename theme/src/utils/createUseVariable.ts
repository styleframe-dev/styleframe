import type { Styleframe, TokenValue, Variable } from "@styleframe/core";
import type { CamelCase } from "scule";
import { camelCase } from "scule";
import type { ExportKeys } from "../types";

export function isKeyReferenceValue(value: unknown): value is `@${string}` {
	return typeof value === "string" && value.startsWith("@");
}

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
	PropertyType = TokenValue,
	Delimiter extends string = ".",
	Defaults extends Record<string, PropertyType> = Record<string, PropertyType>,
	MergeDefaults extends boolean = false,
>(
	propertyName: PropertyName,
	{
		defaults,
		mergeDefaults = false as MergeDefaults,
		transform = (value) => value as TokenValue,
		delimiter = "." as Delimiter,
	}: {
		defaults?: Defaults;
		mergeDefaults?: MergeDefaults;
		transform?: (value: PropertyType) => TokenValue;
		delimiter?: Delimiter;
	} = {},
) {
	type WithDefaults<T> = MergeDefaults extends true ? Defaults & T : T;

	return function useVariable<
		T extends Record<string, PropertyType> = Defaults,
	>(
		s: Styleframe,
		tokens?: T,
	): ExportKeys<PropertyName, WithDefaults<T>, Delimiter> {
		const result: Record<string, Variable<string>> = {};

		const resolvedTokens = mergeDefaults
			? ({ ...defaults, ...tokens } as T)
			: ((tokens ?? defaults ?? {}) as T);
		const pairs = Object.entries(resolvedTokens);

		const hasDefaultKey = "default" in resolvedTokens;
		if (hasDefaultKey) {
			pairs.sort(([_aKey, aValue], [_bKey, bValue]) => {
				if (isKeyReferenceValue(aValue)) return 1;
				if (isKeyReferenceValue(bValue)) return -1;
				return 0;
			});
		}

		const createVariableName = (key: string) =>
			`${propertyName}${key === "default" ? "" : `${delimiter}${key}`}` as const;

		for (const [key, value] of pairs) {
			const variableName = createVariableName(key);
			const exportName: CamelCase<typeof variableName> =
				camelCase(variableName);

			const variableValue = isKeyReferenceValue(value)
				? s.ref(createVariableName(value.substring(1)))
				: transform(value);

			result[exportName] = s.variable(variableName, variableValue, {
				default: true,
			});
		}

		return result as ExportKeys<PropertyName, WithDefaults<T>, Delimiter>;
	};
}
