import { createUseVariable } from "../utils";

export const defaultFontWeightValues = {
	default: "@normal",
	extralight: 200,
	light: 300,
	normal: "normal",
	medium: 500,
	semibold: 600,
	bold: "bold",
	black: 900,
	lighter: "lighter",
	bolder: "bolder",
	inherit: "inherit",
};

/**
 * Create a set of font-weight variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useFontWeight } from "styleframe/theme";
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
 * } = useFontWeight(s, {
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
export const useFontWeight = createUseVariable("font-weight", {
	defaults: defaultFontWeightValues,
});
