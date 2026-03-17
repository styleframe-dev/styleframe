import { createUseDerivedVariable } from "../utils";
import { colorShadeValues } from "../values";

export { colorShadeValues };

/**
 * Create a set of relative color shade (darker) levels
 *
 * @usage
 * const s = styleframe();
 *
 * const { colorPrimary } = useColor(s, { primary: "#007bff" });
 *
 * const {
 *   colorPrimaryShade50, // Variable<'color.primary-shade-50'>
 *   colorPrimaryShade100, // Variable<'color.primary-shade-100'>
 *   colorPrimaryShade150, // Variable<'color.primary-shade-150'>
 *   ...
 * } = useColorShadeLevels(s, colorPrimary, {
 *   "shade-50": 5,
 *   "shade-100": 10,
 *   "shade-150": 15,
 *   ...
 * });
 * ```
 */
export const useColorShade = createUseDerivedVariable({
	defaults: colorShadeValues,
	delimiter: "-",
	transform: (value: number, { s, parent }) => {
		if (typeof value !== "number") {
			return 0;
		}

		return s.css`oklch(from ${s.ref(parent)} calc(l - ${value / 100}) c h / alpha)`;
	},
});
