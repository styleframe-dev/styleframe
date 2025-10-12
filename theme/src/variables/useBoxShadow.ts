import { createUseVariable } from "../utils";

export const defaultBoxShadowValues = {
	default: "@md",
	none: "none",
	// subtle card / surfaces
	xs: "0 1px 1px oklch(var(--box-shadow-color, 0 0 0) / 0.12), 0 2px 2px -1px oklch(var(--box-shadow-color, 0 0 0) / 0.06)",
	// default
	sm: "0 1px 2px oklch(var(--box-shadow-color, 0 0 0) / 0.14), 0 3px 6px -1px oklch(var(--box-shadow-color, 0 0 0) / 0.10)",
	// popover / raised button
	md: "0 2px 4px oklch(var(--box-shadow-color, 0 0 0) / 0.16), 0 8px 16px -4px oklch(var(--box-shadow-color, 0 0 0) / 0.10)",
	// modal / floating panel
	lg: "0 4px 8px oklch(var(--box-shadow-color, 0 0 0) / 0.18), 0 16px 24px -8px oklch(var(--box-shadow-color, 0 0 0) / 0.12)",
	// drawer / high elevation
	xl: "0 8px 12px oklch(var(--box-shadow-color, 0 0 0) / 0.20), 0 24px 48px -12px oklch(var(--box-shadow-color, 0 0 0) / 0.14)",
	// highest elevation / toast over content
	"2xl":
		"0 12px 16px oklch(var(--box-shadow-color, 0 0 0) / 0.22), 0 32px 64px -16px oklch(var(--box-shadow-color, 0 0 0) / 0.16)",
	// borders-for-free on dark backgrounds and inset wells
	inner:
		"inset 0 1px 0 oklch(var(--box-shadow-color, 0 0 0) / 0.08), inset 0 0 0 1px oklch(var(--box-shadow-color, 0 0 0) / 0.06)",
	// focus rings that still read as elevation
	ring: "0 0 0 1px oklch(var(--box-shadow-color, 0 0 0) / 0.12), 0 1px 2px oklch(var(--box-shadow-color, 0 0 0) / 0.08)",
};

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
 *   boxShadowSm, // Variable<'box-shadow--sm'>
 *   boxShadowMd, // Variable<'box-shadow--md'>
 *   boxShadowLg, // Variable<'box-shadow--lg'>
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
