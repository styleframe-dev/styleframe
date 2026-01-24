import { createUseVariable } from "../utils";
import { defaultBorderWidthValues } from "../values";

export { defaultBorderWidthValues };

/**
 * Create a set of border-width variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useBorderWidth } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   borderWidthNone,
 *   borderWidthThin,
 *   borderWidthMedium,
 *   borderWidthThick,
 *   borderWidth,
 * } = useBorderWidth(s, {
 *   default: "thin",
 *   none: 0,
 *   thin: "thin",
 *   medium: "medium",
 *   thick: "thick",
 * });
 * ```
 */
export const useBorderWidth = createUseVariable("border-width", {
	defaults: defaultBorderWidthValues,
});
