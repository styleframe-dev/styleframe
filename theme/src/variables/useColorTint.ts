import type { Styleframe, Variable } from "@styleframe/core";
import type { ExportKeys } from "../types";
import { createUseVariable } from "../utils";

export const defaultColorTintValues = {
	50: 5,
	100: 10,
	150: 15,
	200: 20,
} as const;

/**
 * Create a set of relative color tint (lighter) levels
 *
 * @usage
 * const s = styleframe();
 *
 * const { colorPrimary } = useColor(s, { primary: "#007bff" });
 *
 * const {
 *   colorPrimaryTint50, // Variable<'color.primary-tint-50'>
 *   colorPrimaryTint100, // Variable<'color.primary-tint-100'>
 *   colorPrimaryTint150, // Variable<'color.primary-tint-150'>
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
): ExportKeys<`${Name}-tint`, T, "-"> {
	return createUseVariable(`${color.name}-tint`, {
		defaults: defaultColorTintValues,
		transform: (value) => {
			if (typeof value !== "number") {
				return 0;
			}

			return s.css`oklch(from ${s.ref(color)} calc(l + ${value / 100}) c h / a)`;
		},
		delimiter: "-" as const,
	})(s, levels);
}
