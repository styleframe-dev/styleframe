import { createUseVariable } from "../utils";
import { defaultLineHeightValues } from "../values";

export { defaultLineHeightValues };

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
	defaults: defaultLineHeightValues,
});
