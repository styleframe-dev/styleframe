import { createUseVariable } from "../utils";
import { lineHeightValues } from "../values";

export { lineHeightValues };

/**
 * Create a set of line-height variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useLineHeight } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   lineHeightTight,
 *   lineHeightSnug,
 *   lineHeightNormal,
 *   lineHeightRelaxed,
 *   lineHeightLoose,
 *   lineHeight,
 * } = useLineHeight(s, {
 *   default: "normal",
 *   tight: 1.2,
 *   snug: 1.35,
 *   normal: 1.5,
 *   relaxed: 1.65,
 *   loose: 1.9,
 * });
 * ```
 */
export const useLineHeight = createUseVariable("line-height", {
	defaults: lineHeightValues,
});
