import type { Styleframe, TokenValue, Variable } from "@styleframe/core";
import { isVariable } from "@styleframe/core";
import { type RangeInput, normalizeRange } from "./normalizeRange";

/**
 * Create a fluid value that interpolates between a min and max as the
 * viewport scales. Reads `fluid.breakpoint` (set up via
 * `useFluidViewportDesignTokens`) by default; pass a `Variable` or
 * `TokenValue` as the third argument to use a custom interpolator.
 *
 * Ranges accept either a tuple `[min, max]` or an object `{ min, max }`.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import {
 *   useFontSizeDesignTokens,
 *   useScaleDesignTokens,
 *   useScalePowersDesignTokens,
 *   useMultiplierDesignTokens,
 *   useFluidViewportDesignTokens,
 *   useFluidClamp,
 *   scaleValues,
 * } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const { fontSizeMin, fontSizeMax } = useFontSizeDesignTokens(s, {
 *   min: 16,
 *   max: 18
 * });
 *
 * const { scaleMin, scaleMax } = useScaleDesignTokens(s, {
 *   ...scaleValues,
 *   min: '@scale.minor-third',
 *   max: '@scale.major-third'
 * });
 *
 * const scaleMinPowers = useScalePowersDesignTokens(s, scaleMin);
 * const scaleMaxPowers = useScalePowersDesignTokens(s, scaleMax);
 *
 * const { fluidBreakpoint } = useFluidViewportDesignTokens(s);
 *
 * const {
 *   fontSizeMinXs,
 *   fontSizeMinSm,
 *   fontSizeMinMd,
 *   fontSizeMinLg,
 *   fontSizeMinXl,
 * } = useMultiplierDesignTokens(s, fontSizeMin, {
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
 * } = useMultiplierDesignTokens(s, fontSizeMax, {
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
 * } = useFontSizeDesignTokens(s, {
 *   xs: useFluidClamp(s, [fontSizeMinXs, fontSizeMaxXs]),
 *   sm: useFluidClamp(s, { min: fontSizeMinSm, max: fontSizeMaxSm }),
 *   md: useFluidClamp(s, [fontSizeMinMd, fontSizeMaxMd]),
 *   lg: useFluidClamp(s, { min: fontSizeMinLg, max: fontSizeMaxLg }),
 *   xl: useFluidClamp(s, [fontSizeMinXl, fontSizeMaxXl]),
 *   default: '@font-size.md'
 * });
 * ```
 */
export function useFluidClamp(
	s: Styleframe,
	range: RangeInput<Variable | TokenValue>,
	breakpoint: Variable | TokenValue = s.ref("fluid.breakpoint"),
): TokenValue {
	const [rawMin, rawMax] = normalizeRange(range);
	const min = isVariable(rawMin) ? s.ref(rawMin) : rawMin;
	const max = isVariable(rawMax) ? s.ref(rawMax) : rawMax;
	const bp = isVariable(breakpoint) ? s.ref(breakpoint) : breakpoint;

	return s.css`calc((${min} / 16 * 1rem) + (${max} - ${min}) * ${bp})`;
}
