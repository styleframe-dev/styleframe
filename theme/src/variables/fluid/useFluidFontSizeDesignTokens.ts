import type {
	Reference,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";
import type { ExportKeys } from "@styleframe/theme";
import { createUseVariable } from "@styleframe/theme";
import { useFluidClamp } from "./useFluidClamp";

type Range = [min: TokenValue, max: TokenValue] | `@${string}`;

/**
 * Create a set of fluid font-size variables for use in a Styleframe instance.
 *
 * This function combines a base font size range (min/max) with scale multipliers
 * to create responsive font sizes that scale fluidly between breakpoints.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useScale, useScalePowers, useFluidFontSizeDesignTokens } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const { scaleMin, scaleMax } = useScale(s, {
 *   min: 1.2,    // minor-third
 *   max: 1.25    // major-third
 * });
 *
 * const scaleMinPowers = useScalePowers(s, scaleMin);
 * const scaleMaxPowers = useScalePowers(s, scaleMax);
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
 *   sm: [scaleMinPowers[-1], scaleMaxPowers[-1]],
 *   md: [scaleMinPowers[0], scaleMaxPowers[0]],
 *   lg: [scaleMinPowers[1], scaleMaxPowers[1]],
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

			return useFluidClamp(
				s,
				[
					s.css`${s.ref(fontSizeMin)} * ${value[0]}`,
					s.css`${s.ref(fontSizeMax)} * ${value[1]}`,
				],
				breakpoint,
			);
		},
	})(s, values);
}
