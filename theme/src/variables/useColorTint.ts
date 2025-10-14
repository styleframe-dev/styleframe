import type { Styleframe, Variable } from "@styleframe/core";
import type { CamelCase } from "scule";
import { camelCase } from "scule";

/**
 * Transforms a color into a set of relative color tint (lighter) levels
 *
 * @example <"color--primary", { 50: 5, 100: 10, 200: 20 }> -> {
 * 		colorPrimaryTint50: Variable<'color--primary-tint-50'>,
 * 		colorPrimaryTint100: Variable<'color--primary-tint-100'>,
 * 		colorPrimaryTint200: Variable<'color--primary-tint-200'>
 * }
 */

type ColorTintLevelsExportKeys<
	Name extends string,
	T extends Record<string | number, number>,
> = {
	[K in keyof T as CamelCase<`${Name}-tint-${(string | number) & K}`>]: Variable<`${Name}-tint-${(string | number) & K}`>;
};

/**
 * Create a set of relative color tint (lighter) levels
 *
 * @usage
 * const s = styleframe();
 *
 * const colorPrimary = s.variable("color--primary", "#007bff");
 *
 * const {
 *   colorPrimaryTint50, // Variable<'color--primary-tint-50'>
 *   colorPrimaryTint100, // Variable<'color--primary-tint-100'>
 *   colorPrimaryTint150, // Variable<'color--primary-tint-150'>
 *   ...
 * } = useColorTintLevels(s, colorPrimary, {
 *   50: 5,
 *   100: 10,
 *   150: 15,
 *   ...
 * });
 * ```
 */
export function useColorTint<
	Name extends string,
	T extends Record<string | number, number>,
>(
	s: Styleframe,
	color: Variable<Name>,
	levels: T,
): ColorTintLevelsExportKeys<Name, T> {
	const result: Record<string, Variable<string>> = {};

	for (const [level, value] of Object.entries(levels)) {
		const variableName = `${color.name}-tint-${level}` as const;
		const exportName = camelCase(variableName);

		result[exportName] = s.variable(
			variableName,
			s.css`oklch(from ${s.ref(color)} calc(l + ${value / 100}) c h / a)`,
			{
				default: true,
			},
		);
	}

	return result as ColorTintLevelsExportKeys<Name, T>;
}
