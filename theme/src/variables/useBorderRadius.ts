import { createUseVariable } from "../utils";

export const defaultBorderRadiusValues = {
	default: "@md",
	none: "0",
	sm: "0.125rem",
	md: "0.25rem",
	lg: "0.5rem",
	xl: "0.75rem",
	"2xl": "1rem",
	full: "9999px",
};

/**
 * Create a set of border-radius variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useBorderRadius } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   borderRadius, // Variable<'border-radius'>
 *   borderRadiusSm, // Variable<'border-radius.sm'>
 *   borderRadiusMd, // Variable<'border-radius.md'>
 *   borderRadiusLg, // Variable<'border-radius.lg'>
 * } = useBorderRadius(s, {
 *   default: "0.25rem",
 *   sm: "0.125rem",
 *   md: "0.25rem",
 *   lg: "0.5rem",
 * });
 * ```
 */
export const useBorderRadius = createUseVariable("border-radius", {
	defaults: defaultBorderRadiusValues,
});
