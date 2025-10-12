import { createUseVariable } from "../utils";

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
 *   fontWeight, // Variable<'font-weight'>
 *   fontWeightLight, // Variable<'font-weight--light'>
 *   fontWeightRegular, // Variable<'font-weight--regular'>
 *   fontWeightBold, // Variable<'font-weight--bold'>
 * } = useFontWeight(s, {
 *   default: "400",
 *   light: "300",
 *   regular: "400",
 *   bold: "700",
 * });
 * ```
 */
export const useFontWeight = createUseVariable("font-weight");
