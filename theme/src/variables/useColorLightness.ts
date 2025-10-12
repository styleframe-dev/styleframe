import type { Styleframe, Variable } from "@styleframe/core";
import { camelCase } from "scule";
import type { ExportKeys } from "../types";
import { createUseVariable } from "../utils";

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
	return createUseVariable(
		color.name,
		(value) => {
			if (typeof value !== "number") {
				return 0;
			}

			return s.css`oklch(from ${s.ref(color)} ${value / 100} c h / a)`;
		},
		"-" as const,
	)(s, levels);
}
