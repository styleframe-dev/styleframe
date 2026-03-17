import { createUseDerivedVariable } from "../utils";
import { colorTintValues } from "../values";

export { colorTintValues };

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
 *   "tint-50": 5,
 *   "tint-100": 10,
 *   "tint-150": 15,
 *   ...
 * });
 * ```
 */
export const useColorTint = createUseDerivedVariable({
	defaults: colorTintValues,
	delimiter: "-",
	transform: (value: number, { s, parent }) => {
		if (typeof value !== "number") {
			return 0;
		}

		return s.css`oklch(from ${s.ref(parent)} calc(l + ${value / 100}) c h / alpha)`;
	},
});
