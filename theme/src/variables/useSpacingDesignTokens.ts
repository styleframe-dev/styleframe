import { createUseVariable } from "../utils";
import { spacingValues } from "../values";
/**
 * Create a set of spacing variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useSpacingDesignTokens } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   spacing, // Variable<'spacing'>
 *   spacingSm, // Variable<'spacing.sm'>
 *   spacingMd, // Variable<'spacing.md'>
 *   spacingLg, // Variable<'spacing.lg'>
 * } = useSpacingDesignTokens(s, {
 *   default: "1rem",
 *   sm: "0.875rem",
 *   md: "1rem",
 *   lg: "1.25rem",
 * });
 * ```
 */
export const useSpacingDesignTokens = createUseVariable("spacing", {
	defaults: spacingValues,
});
