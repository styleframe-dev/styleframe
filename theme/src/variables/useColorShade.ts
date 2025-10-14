import type { Styleframe, Variable } from "@styleframe/core";
import type { CamelCase } from "scule";
import { camelCase } from "scule";

/**
 * Transforms color keys into a set of relative color shade (darker) levels
 *
 * @example <"color--primary", { 50: 5, 100: 10, 200: 20 }> -> {
 * 		colorPrimaryShade50: Variable<'color--primary-shade-50'>,
 * 		colorPrimaryShade100: Variable<'color--primary-shade-100'>,
 * 		colorPrimaryShade200: Variable<'color--primary-shade-200'>
 * }
 */
type ColorShadeLevelsExportKeys<
	Name extends string,
	T extends Record<string | number, number>,
> = {
	[K in keyof T as CamelCase<`${Name}-shade-${(string | number) & K}`>]: Variable<`${Name}-shade-${(string | number) & K}`>;
};

/**
 * Create a set of relative color shade (darker) levels
 *
 * @usage
 * const s = styleframe();
 *
 * const colorPrimary = s.variable("color--primary", "#007bff");
 *
 * const {
 *   colorPrimaryShade50, // Variable<'color--primary-shade-50'>
 *   colorPrimaryShade100, // Variable<'color--primary-shade-100'>
 *   colorPrimaryShade150, // Variable<'color--primary-shade-150'>
 *   ...
 * } = useColorShadeLevels(s, colorPrimary, {
 *   50: 5,
 *   100: 10,
 *   150: 15,
 *   ...
 * });
 * ```
 */
export function useColorShade<
	Name extends string,
	T extends Record<string | number, number>,
>(
	s: Styleframe,
	color: Variable<Name>,
	levels: T,
): ColorShadeLevelsExportKeys<Name, T> {
	const result: Record<string, Variable<string>> = {};

	for (const [level, value] of Object.entries(levels)) {
		const variableName = `${color.name}-shade-${level}` as const;
		const exportName = camelCase(variableName);

		result[exportName] = s.variable(
			variableName,
			s.css`oklch(from ${s.ref(color)} calc(l - ${value / 100}) c h / a)`,
			{
				default: true,
			},
		);
	}

	return result as ColorShadeLevelsExportKeys<Name, T>;
}
