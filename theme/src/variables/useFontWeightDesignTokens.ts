import { createUseVariable } from "../utils";
import { fontWeightValues } from "../values";
/**
 * Create a set of font-weight variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useFontWeightDesignTokens } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   fontWeightExtralight,
 *   fontWeightLight,
 *   fontWeightNormal,
 *   fontWeightMedium,
 *   fontWeightSemibold,
 *   fontWeightBold,
 *   fontWeightBlack,
 *   fontWeightLighter,
 *   fontWeightBolder,
 *   fontWeight,
 * } = useFontWeightDesignTokens(s, {
 *   default: "normal",
 *   extralight: 200,
 *   light: 300,
 *   normal: "normal",
 *   medium: 500,
 *   semibold: 600,
 *   bold: 700,
 *   black: 900,
 *   lighter: "lighter",
 *   bolder: "bolder",
 *   inherit: "inherit",
 * });
 * ```
 */
export const useFontWeightDesignTokens = createUseVariable("font-weight", {
	defaults: fontWeightValues,
});
