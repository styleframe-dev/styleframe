import type {
	Reference,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";
import type { ExportKeys } from "../../types";
import { createUseVariable } from "../../utils";
import { type RangeInput, normalizeRange } from "./normalizeRange";
import { useFluidClamp } from "./useFluidClamp";

type Range = RangeInput<TokenValue> | `@${string}`;

/**
 * Create a set of fluid font-size variables for use in a Styleframe instance.
 *
 * This function combines a base font size range (min/max) with scale multipliers
 * to create responsive font sizes that scale fluidly between breakpoints.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import {
 *   useScaleDesignTokens,
 *   useScalePowersDesignTokens,
 *   useFluidViewportDesignTokens,
 *   useFluidFontSizeDesignTokens,
 * } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * useFluidViewportDesignTokens(s);
 *
 * const { scaleMin, scaleMax } = useScaleDesignTokens(s, {
 *   min: 1.2,    // minor-third
 *   max: 1.25,   // major-third
 * });
 *
 * const scaleMinPowers = useScalePowersDesignTokens(s, scaleMin);
 * const scaleMaxPowers = useScalePowersDesignTokens(s, scaleMax);
 *
 * const {
 *   fontSize,    // Variable<'font-size'>
 *   fontSizeXs,  // Variable<'font-size.xs'>
 *   fontSizeSm,  // Variable<'font-size.sm'>
 *   fontSizeMd,  // Variable<'font-size.md'>
 *   fontSizeLg,  // Variable<'font-size.lg'>
 *   fontSizeXl,  // Variable<'font-size.xl'>
 * } = useFluidFontSizeDesignTokens(s, {
 *   min: 16,
 *   max: 18,
 * }, {
 *   xs: [scaleMinPowers[-2], scaleMaxPowers[-2]],
 *   sm: { min: scaleMinPowers[-1], max: scaleMaxPowers[-1] },
 *   md: { min: scaleMinPowers[0], max: scaleMaxPowers[0] },
 *   lg: { min: scaleMinPowers[1], max: scaleMaxPowers[1] },
 *   xl: [scaleMinPowers[2], scaleMaxPowers[2]],
 *   default: '@font-size.md'
 * });
 * ```
 */
export function useFluidFontSizeDesignTokens<T extends Record<string, Range>>(
	s: Styleframe,
	base: {
		min: number;
		max: number;
	},
	values: T,
	breakpoint: Variable | Reference = s.ref("fluid.breakpoint"),
): ExportKeys<"font-size", T> {
	const fontSizeMin = s.variable("font-size.min", base.min, {
		default: true,
	});

	const fontSizeMax = s.variable("font-size.max", base.max, {
		default: true,
	});

	// Use createUseVariable to generate the final variables
	return createUseVariable("font-size", {
		transform: (value: Range) => {
			if (typeof value === "string") {
				return value;
			}

			const [min, max] = normalizeRange(value);

			return useFluidClamp(
				s,
				[
					s.css`${s.ref(fontSizeMin)} * ${min}`,
					s.css`${s.ref(fontSizeMax)} * ${max}`,
				],
				breakpoint,
			);
		},
	})(s, values);
}
