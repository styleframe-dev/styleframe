import type { Styleframe, TokenValue, Variable } from "@styleframe/core";
import type { CamelCase } from "scule";
import { camelCase } from "scule";

/**
 * Transforms color keys to their lightness level export names
 *
 * @example <"color--primary", { 100: 10, 200: 20 }> -> {
 * 		colorPrimary100: Variable<'color--primary-100'>,
 * 		colorPrimary200: Variable<'color--primary-200'>
 * }
 */
type ColorLightnessExportKeys<
	Name extends string,
	T extends Record<string | number, TokenValue>,
> = {
	[K in keyof T as CamelCase<`${Name}-${(string | number) & K}`>]: Variable<`${Name}-${(string | number) & K}`>;
};

/**
 * Create a set of lightness levels for a color variable.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useColors } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const colorPrimary = s.variable("color--primary", "#007bff");
 *
 * const {
 *   colorPrimary100, // Variable<'color--primary-100'>
 *   colorPrimary200, // Variable<'color--primary-200'>
 *   colorPrimary300, // Variable<'color--primary-300'>
 *   ...
 * } = useColorLightnessLevels(s, colorPrimary, {
 *   100: 10,
 *   200: 20,
 *   300: 30,
 *   ...
 * });
 * ```
 */
export function useColorLightness<
	Name extends string,
	T extends Record<string | number, number>,
>(
	s: Styleframe,
	color: Variable<Name>,
	levels: T,
): ColorLightnessExportKeys<Name, T> {
	const result: Record<string, Variable<string>> = {};

	for (const [level, value] of Object.entries(levels)) {
		const variableName = `${color.name}-${level}` as const;
		const exportName = camelCase(variableName);

		result[exportName] = s.variable(
			variableName,
			s.css`oklch(from ${s.ref(color)} ${value / 100} c h / a)`,
			{
				default: true,
			},
		);
	}

	return result as ColorLightnessExportKeys<Name, T>;
}
