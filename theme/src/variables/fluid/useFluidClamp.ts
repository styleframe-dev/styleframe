import type { Styleframe, TokenValue, Variable } from "@styleframe/core";
import { isVariable } from "@styleframe/core";

/**
 * Create a font-size scale for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useFontSize, useScale, useScalePowers, useMultiplier } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const { fontSizeMin, fontSizeMax } = useFontSize(s, {
 *   min: 16,
 *   max: 18
 * });
 *
 * const { scaleMin, scaleMax } = useScale(s, {
 *   ...defaultScaleValues,
 *   min: '@minor-third',
 *   max: '@major-third'
 * });
 *
 * const scaleMinPowers = useScalePowers(s, scaleMin);
 * const scaleMaxPowers = useScalePowers(s, scaleMax);
 *
 * const { fluidBreakpoint } = useFluidViewportDesignTokens(s);
 *
 * const {
 *   fontSizeMinXs,
 *   fontSizeMinSm,
 *   fontSizeMinMd,
 *   fontSizeMinLg,
 *   fontSizeMinXl,
 * } = useMultiplier(s, fontSizeMin, {
 *   xs: scaleMinPowers[-2],
 *   sm: scaleMinPowers[-1],
 *   md: scaleMinPowers[0],
 *   lg: scaleMinPowers[1],
 *   xl: scaleMinPowers[2],
 * });
 *
 * const {
 *   fontSizeMaxXs,
 *   fontSizeMaxSm,
 *   fontSizeMaxMd,
 *   fontSizeMaxLg,
 *   fontSizeMaxXl,
 * } = useMultiplier(s, fontSizeMax, {
 *   xs: scaleMaxPowers[-2],
 *   sm: scaleMaxPowers[-1],
 *   md: scaleMaxPowers[0],
 *   lg: scaleMaxPowers[1],
 *   xl: scaleMaxPowers[2],
 * });
 *
 * const {
 *   fontSize,
 *   fontSizeXs,
 *   fontSizeSm,
 *   fontSizeMd,
 *   fontSizeLg,
 *   fontSizeXl,
 * } = useFontSize(s, {
 *   xs: useFluidRangeValue(s, [fontSizeMinXs, fontSizeMaxXs]),
 *   sm: useFluidRangeValue(s, [fontSizeMinSm, fontSizeMaxSm]),
 *   md: useFluidRangeValue(s, [fontSizeMinMd, fontSizeMaxMd]),
 *   lg: useFluidRangeValue(s, [fontSizeMinLg, fontSizeMaxLg]),
 *   xl: useFluidRangeValue(s, [fontSizeMinXl, fontSizeMaxXl]),
 *   default: '@font-size.md'
 * });
 * ```
 */
export function useFluidClamp(
	s: Styleframe,
	range: [min: Variable | TokenValue, max: Variable | TokenValue],
	breakpoint: Variable | TokenValue = s.ref("fluid.breakpoint"),
): TokenValue {
	const min = isVariable(range[0]) ? s.ref(range[0]) : range[0];
	const max = isVariable(range[1]) ? s.ref(range[1]) : range[1];
	const bp = isVariable(breakpoint) ? s.ref(breakpoint) : breakpoint;

	return s.css`calc((${min} / 16 * 1rem) + (${max} - ${min}) * ${bp})`;
}
