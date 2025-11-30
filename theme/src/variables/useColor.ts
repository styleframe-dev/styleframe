import { oklch } from "culori";
import { createUseVariable } from "../utils";

/**
 * Create a set of color variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useColors } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   colorPrimary, // Variable<'color.primary'>
 *   colorSecondary, // Variable<'color.secondary'>
 * } = useColors(s, {
 *   primary: "#007bff",
 *   secondary: "#6c757d",
 * });
 * ```
 */

export const useColor = createUseVariable("color", {
	transform: (value) => {
		let transformedValue = value;

		if (typeof value === "string") {
			const { l, c, h, alpha = 1 } = oklch(value);
			transformedValue = `oklch(${l} ${c} ${h} / ${alpha})`;
		}

		return transformedValue;
	},
});
