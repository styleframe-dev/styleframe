import { createUseVariable } from "../utils";
import { breakpointValues } from "../values";

export { breakpointValues };

/**
 * Create a set of breakpoint variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useBreakpoint } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   breakpointXs, // Variable<'breakpoint.xs'>
 *   breakpointSm, // Variable<'breakpoint.sm'>
 *   breakpointMd, // Variable<'breakpoint.md'>
 *   breakpointLg, // Variable<'breakpoint.lg'>
 *   breakpointXl, // Variable<'breakpoint.xl'>
 * } = useBreakpoint(s, {
 *   xs: 0,
 *   sm: 576,
 *   md: 992,
 *   lg: 1200,
 *   xl: 1440,
 * });
 * ```
 */
export const useBreakpoint = createUseVariable("breakpoint", {
	defaults: breakpointValues,
});
