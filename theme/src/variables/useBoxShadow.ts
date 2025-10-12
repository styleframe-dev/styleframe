import { createUseVariable } from "../utils";

/**
 * Create a set of box-shadow variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useBoxShadow } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   boxShadow, // Variable<'box-shadow'>
 *   boxShadowSm, // Variable<'box-shadow--sm'>
 *   boxShadowMd, // Variable<'box-shadow--md'>
 *   boxShadowLg, // Variable<'box-shadow--lg'>
 * } = useBoxShadow(s, {
 *   default: "0 2px 4px rgba(0, 0, 0, 0.1)",
 *   sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
 *   md: "0 4px 8px rgba(0, 0, 0, 0.1)",
 *   lg: "0 8px 16px rgba(0, 0, 0, 0.15)",
 * });
 * ```
 */
export const useBoxShadow = createUseVariable("box-shadow");
