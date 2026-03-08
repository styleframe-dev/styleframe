import { createUseDerivedVariable } from "../utils";
import { colorLightnessValues } from "../values";

export { colorLightnessValues };

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
 * const { colorPrimary } = useColor(s, { primary: "#007bff" });
 *
 * const {
 *   colorPrimary100, // Variable<'color.primary-100'>
 *   colorPrimary200, // Variable<'color.primary-200'>
 *   colorPrimary300, // Variable<'color.primary-300'>
 *   ...
 * } = useColorLightnessLevels(s, colorPrimary, {
 *   100: 10,
 *   200: 20,
 *   300: 30,
 *   ...
 * });
 * ```
 */
export const useColorLightness = createUseDerivedVariable({
	defaults: colorLightnessValues,
	delimiter: "-",
	transform: (value: number, { s, parent }) => {
		if (typeof value !== "number") {
			return 0;
		}

		return s.css`oklch(from ${s.ref(parent)} ${value}% c h / alpha)`;
	},
});
