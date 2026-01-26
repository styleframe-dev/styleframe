import { createUseVariable } from "../utils";
import { fontSizeValues } from "../values";

export { fontSizeValues };

/**
 * Create a set of font-size variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useFontSize } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   fontSize, // Variable<'font-size'>
 *   fontSizeSm, // Variable<'font-size.sm'>
 *   fontSizeMd, // Variable<'font-size.md'>
 *   fontSizeLg, // Variable<'font-size.lg'>
 * } = useFontSize(s, {
 *   default: "1rem",
 *   sm: "0.875rem",
 *   md: "1rem",
 *   lg: "1.25rem",
 * });
 * ```
 */
export const useFontSize = createUseVariable("font-size", {
	defaults: fontSizeValues,
});
