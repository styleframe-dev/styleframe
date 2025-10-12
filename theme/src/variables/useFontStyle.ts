import { createUseVariable } from "../utils";

export const defaultFontStyleValues = {
	default: "@normal",
	italic: "italic",
	oblique: "oblique",
	normal: "normal",
	inherit: "inherit",
};

/**
 * Create a set of font-style variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useFontStyle } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   fontStyleItalic,
 *   fontStyleOblique,
 *   fontStyleNormal,
 *   fontStyle,
 * } = useFontStyle(s, {
 *   default: "normal",
 *   italic: "italic",
 *   oblique: "oblique",
 *   normal: "normal",
 *   inherit: "inherit",
 * });
 * ```
 */
export const useFontStyle = createUseVariable("font-style", {
	defaults: defaultFontStyleValues,
});
