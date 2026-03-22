import { createUseDerivedVariable } from "../utils";

/**
 * Create a font-size scale for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useFontSizeDesignTokens, useScaleDesignTokens, useScalePowersDesignTokens, useMultiplierDesignTokens } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const { scale } = useScaleDesignTokens(s);
 * const { fontSize } = useFontSizeDesignTokens(s);
 *
 * const scalePowers = useScalePowersDesignTokens(s, scale, defaultScalePowerValues);
 *
 * const {
 *   fontSizeXs, // Variable<'font-size.xs'>
 *   fontSizeSm, // Variable<'font-size.sm'>
 *   fontSizeMd, // Variable<'font-size.md'>
 *   fontSizeLg, // Variable<'font-size.lg'>
 *   fontSizeXl, // Variable<'font-size.xl'>
 * } = useMultiplierDesignTokens(s, fontSize, {
 *   xs: scalePowers[-2],
 *   sm: scalePowers[-1],
 *   md: scalePowers[0],
 *   lg: scalePowers[1],
 *   xl: scalePowers[2],
 * });
 * ```
 */
export const useMultiplierDesignTokens = createUseDerivedVariable({
	transform: (value, { s, parent }) => {
		return s.css`calc(${s.ref(parent)} * ${value})`;
	},
});
