import { createUseVariable } from "../utils";
import { fontStyleValues } from "../values";
/**
 * Create a set of font-style variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useFontStyleDesignTokens } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   fontStyleItalic,
 *   fontStyleOblique,
 *   fontStyleNormal,
 *   fontStyle,
 * } = useFontStyleDesignTokens(s, {
 *   default: "normal",
 *   italic: "italic",
 *   oblique: "oblique",
 *   normal: "normal",
 *   inherit: "inherit",
 * });
 * ```
 */
export const useFontStyleDesignTokens = createUseVariable("font-style", {
	defaults: fontStyleValues,
});
