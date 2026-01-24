import { createUseVariable } from "../utils";
import { defaultBoxShadowValues } from "../values";

export { defaultBoxShadowValues };

/**
 * Create a set of box-shadow variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useBoxShadow } from "styleframe/theme";
 *
 * const s = styleframe();
 * const { variable } = s;
 *
 * const boxShadowColor = s.variable("box-shadow-color", "0 0 0");
 *
 * const {
 *   boxShadow, // Variable<'box-shadow'>
 *   boxShadowSm, // Variable<'box-shadow.sm'>
 *   boxShadowMd, // Variable<'box-shadow.md'>
 *   boxShadowLg, // Variable<'box-shadow.lg'>
 * } = useBoxShadow(s, {
 *   default: '@md',
 *   sm: css`0 1px 2px oklcha(${ref(boxShadowColor)} / 0.05)`,
 *   md: css`0 4px 8px oklcha(${ref(boxShadowColor)} / 0.1)`,
 *   lg: css`0 8px 16px oklcha(${ref(boxShadowColor)} / 0.15)`,
 * });
 * ```
 */
export const useBoxShadow = createUseVariable("box-shadow", {
	defaults: defaultBoxShadowValues,
});
