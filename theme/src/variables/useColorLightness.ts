import type { Styleframe, Variable } from "@styleframe/core";
import { camelCase } from "scule";
import type { ExportKeys } from "../types";
import { createUseVariable } from "../utils";

export const defaultColorLightnessValues = {
	50: 5,
	100: 10,
	200: 20,
	300: 30,
	400: 40,
	500: 50,
	600: 60,
	700: 70,
	800: 80,
	900: 90,
	950: 95,
} as const;

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
>(s: Styleframe, color: Variable<Name>, levels: T): ExportKeys<Name, T, "-"> {
	return createUseVariable(color.name, {
		defaults: defaultColorLightnessValues,
		transform: (value) => {
			if (typeof value !== "number") {
				return 0;
			}

			return s.css`oklch(from ${s.ref(color)} ${value / 100} c h / a)`;
		},
		delimiter: "-" as const,
	})(s, levels);
}
