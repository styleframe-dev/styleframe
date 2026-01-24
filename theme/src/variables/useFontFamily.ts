import { createUseVariable } from "../utils";
import { defaultFontFamilyValues } from "../values";

export { defaultFontFamilyValues };

/**
 * Create a set of font family variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useFontFamily } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   fontFamily, // Variable<'font-family'>
 *   fontFamilyPrint, // Variable<'font-family.print'>
 *   fontFamilyMono, // Variable<'font-family.mono'>
 * } = useFontFamily(s, {
 *   default: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
 *   print: "'Georgia', 'Times New Roman', 'Times', serif",
 *   mono: "'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
 * });
 * ```
 */
export const useFontFamily = createUseVariable("font-family", {
	defaults: defaultFontFamilyValues,
});
