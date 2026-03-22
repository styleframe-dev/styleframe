import { createUseVariable } from "../utils";
import { parseOklch } from "../utils/oklchGamut";
/**
 * Create a set of color variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useColorDesignTokens } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   colorPrimary, // Variable<'color.primary'>
 *   colorSecondary, // Variable<'color.secondary'>
 * } = useColorDesignTokens(s, {
 *   primary: "#007bff",
 *   secondary: "#6c757d",
 * });
 * ```
 */

export const useColorDesignTokens = createUseVariable("color", {
	transform: (value) => {
		let transformedValue = value;

		if (typeof value === "string") {
			const parsed = parseOklch(value);
			if (parsed) {
				const { l, c, h, alpha } = parsed;
				transformedValue = `oklch(${l} ${c} ${h} / ${alpha})`;
			}
		}

		return transformedValue;
	},
});
