import { createUseVariable } from "../utils";
import { borderStyleValues } from "../values";

export { borderStyleValues };

/**
 * Create a set of border-style variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useBorderStyle } from "styleframe/theme";
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
 * } = useBorderStyle(s, {
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
export const useBorderStyle = createUseVariable("border-style", {
	defaults: borderStyleValues,
});
