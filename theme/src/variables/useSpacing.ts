import { createUseVariable } from "../utils";

export const defaultSpacingValues = {
	default: "@md",
	"2xs": "0.25rem",
	xs: "0.5rem",
	sm: "0.75rem",
	md: "1rem",
	lg: "1.5rem",
	xl: "2rem",
	"2xl": "3rem",
	"3xl": "4rem",
};

/**
 * Create a set of spacing variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useSpacing } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   spacing, // Variable<'spacing'>
 *   spacingSm, // Variable<'spacing.sm'>
 *   spacingMd, // Variable<'spacing.md'>
 *   spacingLg, // Variable<'spacing.lg'>
 * } = useSpacing(s, {
 *   default: "1rem",
 *   sm: "0.875rem",
 *   md: "1rem",
 *   lg: "1.25rem",
 * });
 * ```
 */
export const useSpacing = createUseVariable("spacing", {
	defaults: defaultSpacingValues,
});
