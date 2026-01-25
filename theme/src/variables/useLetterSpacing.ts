import { createUseVariable } from "../utils";
import { letterSpacingValues } from "../values";

export { letterSpacingValues };

/**
 * Create a set of letter-spacing variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useLetterSpacing } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   letterSpacingTighter,
 *   letterSpacingTight,
 *   letterSpacingNormal,
 *   letterSpacingWide,
 *   letterSpacingWider,
 *   letterSpacing,
 * } = useLetterSpacing(s, {
 *   default: "normal",
 *   tighter: "-0.05em",
 *   tight: "-0.025em",
 *   normal: "normal",
 *   wide: "0.05em",
 *   wider: "0.1em",
 * });
 * ```
 */
export const useLetterSpacing = createUseVariable("letter-spacing", {
	defaults: letterSpacingValues,
});
