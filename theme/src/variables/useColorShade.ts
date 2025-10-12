import type { Styleframe, Variable } from "@styleframe/core";
import type { ExportKeys } from "../types";
import { createUseVariable } from "../utils";

export const defaultColorShadeValues = {
	50: 5,
	100: 10,
	150: 15,
	200: 20,
} as const;

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
): ExportKeys<`${Name}-shade`, T, "-"> {
	return createUseVariable(`${color.name}-shade`, {
		defaults: defaultColorShadeValues,
		transform: (value) => {
			if (typeof value !== "number") {
				return 0;
			}

			return s.css`oklch(from ${s.ref(color)} calc(l - ${value / 100}) c h / a)`;
		},
		delimiter: "-" as const,
	})(s, levels);
}
