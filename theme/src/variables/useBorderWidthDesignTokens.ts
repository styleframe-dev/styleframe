import { createUseVariable } from "../utils";
import { borderWidthValues } from "../values";
/**
 * Create a set of border-width variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useBorderWidthDesignTokens } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   borderWidthNone,
 *   borderWidthThin,
 *   borderWidthMedium,
 *   borderWidthThick,
 *   borderWidth,
 * } = useBorderWidthDesignTokens(s, {
 *   default: "thin",
 *   none: 0,
 *   thin: "thin",
 *   medium: "medium",
 *   thick: "thick",
 * });
 * ```
 */
export const useBorderWidthDesignTokens = createUseVariable("border-width", {
	defaults: borderWidthValues,
});
