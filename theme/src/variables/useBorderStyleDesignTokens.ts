import { createUseVariable } from "../utils";
import { borderStyleValues } from "../values";
/**
 * Create a set of border-style variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useBorderStyleDesignTokens } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   borderStyleNone,
 *   borderStyleSolid,
 *   borderStyleDashed,
 *   borderStyleDotted,
 *   borderStyleDouble,
 *   borderStyleGroove,
 *   borderStyleInset,
 *   borderStyleOutset,
 *   borderStyle,
 * } = useBorderStyleDesignTokens(s, {
 *   default: "solid",
 *   none: "none",
 *   dashed: "dashed",
 *   dotted: "dotted",
 *   double: "double",
 *   groove: "groove",
 *   inset: "inset",
 *   outset: "outset",
 * });
 * ```
 */
export const useBorderStyleDesignTokens = createUseVariable("border-style", {
	defaults: borderStyleValues,
});
