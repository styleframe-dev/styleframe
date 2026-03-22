import { createUseVariable } from "../utils";
import { borderRadiusValues } from "../values";
/**
 * Create a set of border-radius variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useBorderRadiusDesignTokens } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   borderRadius, // Variable<'border-radius'>
 *   borderRadiusSm, // Variable<'border-radius.sm'>
 *   borderRadiusMd, // Variable<'border-radius.md'>
 *   borderRadiusLg, // Variable<'border-radius.lg'>
 * } = useBorderRadiusDesignTokens(s, {
 *   default: "0.25rem",
 *   sm: "0.125rem",
 *   md: "0.25rem",
 *   lg: "0.5rem",
 * });
 * ```
 */
export const useBorderRadiusDesignTokens = createUseVariable("border-radius", {
	defaults: borderRadiusValues,
});
