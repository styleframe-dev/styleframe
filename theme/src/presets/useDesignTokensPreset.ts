import type { Styleframe, TokenValue, Variable } from "@styleframe/core";
import type { ExportKeys } from "../types";
import {
	borderRadiusValues,
	borderStyleValues,
	borderWidthValues,
	boxShadowValues,
	breakpointValues,
	colorLightnessValues,
	colorShadeValues,
	colorTintValues,
	colorValues,
	easingValues,
	fontFamilyValues,
	fontSizeValues,
	fontStyleValues,
	fontWeightValues,
	letterSpacingValues,
	lineHeightValues,
	scalePowerValues,
	scaleValues,
	spacingValues,
	useBorderRadius,
	useBorderStyle,
	useBorderWidth,
	useBoxShadow,
	useBreakpoint,
	useColor,
	useColorLightness,
	useColorShade,
	useColorTint,
	useEasing,
	useFontFamily,
	useFontSize,
	useFontStyle,
	useFontWeight,
	useLetterSpacing,
	useLineHeight,
	useScale,
	useScalePowers,
	useSpacing,
} from "../variables";

// =============================================================================
// Default Value Type Aliases
// =============================================================================

type DefaultSpacing = typeof spacingValues;
type DefaultBorderWidth = typeof borderWidthValues;
type DefaultBorderRadius = typeof borderRadiusValues;
type DefaultBorderStyle = typeof borderStyleValues;
type DefaultBoxShadow = typeof boxShadowValues;
type DefaultColors = typeof colorValues;
type DefaultFontFamily = typeof fontFamilyValues;
type DefaultFontSize = typeof fontSizeValues;
type DefaultFontStyle = typeof fontStyleValues;
type DefaultFontWeight = typeof fontWeightValues;
type DefaultLineHeight = typeof lineHeightValues;
type DefaultLetterSpacing = typeof letterSpacingValues;
type DefaultScale = typeof scaleValues;
type DefaultBreakpoint = typeof breakpointValues;
type DefaultEasing = typeof easingValues;

// Variation level types
type DefaultLightnessLevels = typeof colorLightnessValues;
type DefaultShadeLevels = typeof colorShadeValues;
type DefaultTintLevels = typeof colorTintValues;

// =============================================================================
// Helper Types for Conditional Result Inference
// =============================================================================

/**
 * Resolves which value record to use based on config:
 * - false => never (will be undefined)
 * - undefined => default values
 * - custom record => that record (or merged with defaults if TMerge is true)
 */
type ResolveTokens<
	TConfig,
	TDefault extends Record<string, unknown>,
	TMerge extends boolean = false,
> = TConfig extends false
	? never
	: TConfig extends undefined
		? TDefault
		: TConfig extends Record<string, unknown>
			? TMerge extends true
				? Omit<TDefault, keyof TConfig> & TConfig
				: TConfig
			: TDefault;

/**
 * Generates ExportKeys or undefined based on config
 */
type TokenResult<
	TConfig,
	TPrefix extends string,
	TDefault extends Record<string, unknown>,
	TMerge extends boolean = false,
	TSeparator extends string = ".",
> = TConfig extends false
	? undefined
	: ExportKeys<TPrefix, ResolveTokens<TConfig, TDefault, TMerge>, TSeparator>;

/**
 * Helper to convert a union to an intersection
 */
type UnionToIntersection<U> = (
	U extends unknown
		? (k: U) => void
		: never
) extends (k: infer I) => void
	? I
	: never;

/**
 * Generates all variation keys for a single color name (distributive over K)
 */
type ColorVariationsForKey<K> = K extends string
	? ExportKeys<`color.${K}`, DefaultLightnessLevels, "-"> &
			ExportKeys<`color.${K}-shade`, DefaultShadeLevels, "-"> &
			ExportKeys<`color.${K}-tint`, DefaultTintLevels, "-">
	: never;

/**
 * Generates all variation keys for all colors in the record
 */
type AllColorVariations<TColors extends Record<string, string>> =
	UnionToIntersection<ColorVariationsForKey<keyof TColors>>;

/**
 * Color result type that strongly types base colors and all variations.
 */
type ColorResult<
	TColors extends Record<string, string> | false,
	TMerge extends boolean = false,
> = TColors extends false
	? undefined
	: TColors extends Record<string, string>
		? TMerge extends true
			? ExportKeys<"color", Omit<DefaultColors, keyof TColors> & TColors, "."> &
					AllColorVariations<Omit<DefaultColors, keyof TColors> & TColors>
			: ExportKeys<"color", TColors, "."> & AllColorVariations<TColors>
		: ExportKeys<"color", DefaultColors, "."> &
				AllColorVariations<DefaultColors>;

// =============================================================================
// Configuration Types
// =============================================================================

/**
 * Configuration for color generation behavior
 */
export interface ColorsMetaConfig {
	generateLightness?: boolean;
	generateShades?: boolean;
	generateTints?: boolean;
	lightnessLevels?: Record<string | number, number>;
	shadeLevels?: Record<string | number, number>;
	tintLevels?: Record<string | number, number>;
}

/**
 * Meta configuration for advanced options
 */
export interface MetaConfig {
	/**
	 * When true, custom values are merged with defaults instead of replacing them.
	 * Custom values override defaults with the same key.
	 */
	merge?: boolean;
	colors?: ColorsMetaConfig;
}

/**
 * Meta configuration with merge option typed for inference
 */
export type MetaConfigWithMerge<TMerge extends boolean = false> = Omit<
	MetaConfig,
	"merge"
> & {
	merge?: TMerge;
};

/**
 * Configuration options for the default design tokens preset.
 * Generic type parameters capture the shape of each domain's configuration.
 *
 * - Omit or set to `undefined` to use default values
 * - Set to `false` to disable the domain entirely
 * - Provide a custom record to use custom values
 * - Set `meta.merge` to `true` to merge custom values with defaults
 */
export interface DesignTokensPresetConfig<
	TSpacing extends Record<string, TokenValue> | false = DefaultSpacing,
	TBorderWidth extends Record<string, TokenValue> | false = DefaultBorderWidth,
	TBorderRadius extends
		| Record<string, TokenValue>
		| false = DefaultBorderRadius,
	TBorderStyle extends Record<string, TokenValue> | false = DefaultBorderStyle,
	TBoxShadow extends Record<string, TokenValue> | false = DefaultBoxShadow,
	TColors extends Record<string, string> | false = DefaultColors,
	TFontFamily extends Record<string, TokenValue> | false = DefaultFontFamily,
	TFontSize extends Record<string, TokenValue> | false = DefaultFontSize,
	TFontStyle extends Record<string, TokenValue> | false = DefaultFontStyle,
	TFontWeight extends Record<string, TokenValue> | false = DefaultFontWeight,
	TLineHeight extends Record<string, TokenValue> | false = DefaultLineHeight,
	TLetterSpacing extends
		| Record<string, TokenValue>
		| false = DefaultLetterSpacing,
	TScale extends Record<string, TokenValue> | false = DefaultScale,
	TBreakpoint extends Record<string, number> | false = DefaultBreakpoint,
	TEasing extends Record<string, TokenValue> | false = DefaultEasing,
	TMerge extends boolean = false,
> {
	spacing?: TSpacing;
	borderWidth?: TBorderWidth;
	borderRadius?: TBorderRadius;
	borderStyle?: TBorderStyle;
	boxShadow?: TBoxShadow;
	colors?: TColors;
	meta?: MetaConfigWithMerge<TMerge>;
	fontFamily?: TFontFamily;
	fontSize?: TFontSize;
	fontStyle?: TFontStyle;
	fontWeight?: TFontWeight;
	lineHeight?: TLineHeight;
	letterSpacing?: TLetterSpacing;
	scale?: TScale;
	scalePowers?: readonly number[];
	breakpoint?: TBreakpoint;
	easing?: TEasing;
}

/**
 * Result structure for the default design tokens preset.
 * The result type reflects the exact structure based on config generics.
 */
export interface DesignTokensPresetResult<
	TSpacing extends Record<string, TokenValue> | false = DefaultSpacing,
	TBorderWidth extends Record<string, TokenValue> | false = DefaultBorderWidth,
	TBorderRadius extends
		| Record<string, TokenValue>
		| false = DefaultBorderRadius,
	TBorderStyle extends Record<string, TokenValue> | false = DefaultBorderStyle,
	TBoxShadow extends Record<string, TokenValue> | false = DefaultBoxShadow,
	TColors extends Record<string, string> | false = DefaultColors,
	TFontFamily extends Record<string, TokenValue> | false = DefaultFontFamily,
	TFontSize extends Record<string, TokenValue> | false = DefaultFontSize,
	TFontStyle extends Record<string, TokenValue> | false = DefaultFontStyle,
	TFontWeight extends Record<string, TokenValue> | false = DefaultFontWeight,
	TLineHeight extends Record<string, TokenValue> | false = DefaultLineHeight,
	TLetterSpacing extends
		| Record<string, TokenValue>
		| false = DefaultLetterSpacing,
	TScale extends Record<string, TokenValue> | false = DefaultScale,
	TBreakpoint extends Record<string, number> | false = DefaultBreakpoint,
	TEasing extends Record<string, TokenValue> | false = DefaultEasing,
	TMerge extends boolean = false,
> {
	spacing: TokenResult<TSpacing, "spacing", DefaultSpacing, TMerge>;
	borderWidth: TokenResult<
		TBorderWidth,
		"border-width",
		DefaultBorderWidth,
		TMerge
	>;
	borderRadius: TokenResult<
		TBorderRadius,
		"border-radius",
		DefaultBorderRadius,
		TMerge
	>;
	borderStyle: TokenResult<
		TBorderStyle,
		"border-style",
		DefaultBorderStyle,
		TMerge
	>;
	boxShadow: TokenResult<TBoxShadow, "box-shadow", DefaultBoxShadow, TMerge>;
	colors: ColorResult<TColors, TMerge>;
	fontFamily: TokenResult<
		TFontFamily,
		"font-family",
		DefaultFontFamily,
		TMerge
	>;
	fontSize: TokenResult<TFontSize, "font-size", DefaultFontSize, TMerge>;
	fontStyle: TokenResult<TFontStyle, "font-style", DefaultFontStyle, TMerge>;
	fontWeight: TokenResult<
		TFontWeight,
		"font-weight",
		DefaultFontWeight,
		TMerge
	>;
	lineHeight: TokenResult<
		TLineHeight,
		"line-height",
		DefaultLineHeight,
		TMerge
	>;
	letterSpacing: TokenResult<
		TLetterSpacing,
		"letter-spacing",
		DefaultLetterSpacing,
		TMerge
	>;
	scale: TokenResult<TScale, "scale", DefaultScale, TMerge>;
	scalePowers: TScale extends false ? undefined : Record<number, TokenValue>;
	breakpoint: TokenResult<TBreakpoint, "breakpoint", DefaultBreakpoint, TMerge>;
	easing: TokenResult<TEasing, "easing", DefaultEasing, TMerge>;
}

/**
 * Default colors meta configuration
 */
export const defaultColorsMetaConfig: Required<ColorsMetaConfig> = {
	generateLightness: true,
	generateShades: true,
	generateTints: true,
	lightnessLevels: colorLightnessValues,
	shadeLevels: colorShadeValues,
	tintLevels: colorTintValues,
};

/**
 * Create a complete design token system with sensible defaults.
 *
 * @param s - The Styleframe instance
 * @param config - Configuration options for customizing the preset
 * @returns An object containing all generated design token variables
 *
 * @remarks
 * **Scale Powers**: The `scalePowers` result is only generated when the `scale` config
 * includes a key named `scale` (either via defaults or a custom config with `{ default: "@scale", scale: "1.2" }`).
 * If you provide a custom scale config without a `scale` key (e.g., `{ ratio: "1.25" }`),
 * `scalePowers` will be `undefined`.
 *
 * @example
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useDesignTokensPreset } from "@styleframe/theme";
 *
 * const s = styleframe();
 *
 * // Use all defaults
 * const tokens = useDesignTokensPreset(s);
 *
 * // Customize specific domains
 * const tokens = useDesignTokensPreset(s, {
 *     colors: { primary: "#ff6600", secondary: "#333" },
 *     meta: {
 *         colors: {
 *             generateLightness: true,
 *             generateShades: false,
 *         },
 *     },
 *     spacing: {
 *         default: "0.5rem",
 *         sm: "0.25rem",
 *         md: "0.5rem",
 *         lg: "1rem",
 *     },
 *     easing: false, // Disable easing entirely
 * });
 *
 * // Merge custom values with defaults
 * const tokens = useDesignTokensPreset(s, {
 *     meta: { merge: true },
 *     spacing: { xl: "2rem", xxl: "4rem" }, // Added to default spacing values
 *     colors: { brand: "#ff6600" }, // Added to default colors
 * });
 * ```
 */
export function useDesignTokensPreset<
	TSpacing extends Record<string, TokenValue> | false = DefaultSpacing,
	TBorderWidth extends Record<string, TokenValue> | false = DefaultBorderWidth,
	TBorderRadius extends
		| Record<string, TokenValue>
		| false = DefaultBorderRadius,
	TBorderStyle extends Record<string, TokenValue> | false = DefaultBorderStyle,
	TBoxShadow extends Record<string, TokenValue> | false = DefaultBoxShadow,
	TColors extends Record<string, string> | false = DefaultColors,
	TFontFamily extends Record<string, TokenValue> | false = DefaultFontFamily,
	TFontSize extends Record<string, TokenValue> | false = DefaultFontSize,
	TFontStyle extends Record<string, TokenValue> | false = DefaultFontStyle,
	TFontWeight extends Record<string, TokenValue> | false = DefaultFontWeight,
	TLineHeight extends Record<string, TokenValue> | false = DefaultLineHeight,
	TLetterSpacing extends
		| Record<string, TokenValue>
		| false = DefaultLetterSpacing,
	TScale extends Record<string, TokenValue> | false = DefaultScale,
	TBreakpoint extends Record<string, number> | false = DefaultBreakpoint,
	TEasing extends Record<string, TokenValue> | false = DefaultEasing,
	TMerge extends boolean = false,
>(
	s: Styleframe,
	config: DesignTokensPresetConfig<
		TSpacing,
		TBorderWidth,
		TBorderRadius,
		TBorderStyle,
		TBoxShadow,
		TColors,
		TFontFamily,
		TFontSize,
		TFontStyle,
		TFontWeight,
		TLineHeight,
		TLetterSpacing,
		TScale,
		TBreakpoint,
		TEasing,
		TMerge
	> = {} as DesignTokensPresetConfig<
		TSpacing,
		TBorderWidth,
		TBorderRadius,
		TBorderStyle,
		TBoxShadow,
		TColors,
		TFontFamily,
		TFontSize,
		TFontStyle,
		TFontWeight,
		TLineHeight,
		TLetterSpacing,
		TScale,
		TBreakpoint,
		TEasing,
		TMerge
	>,
): DesignTokensPresetResult<
	TSpacing,
	TBorderWidth,
	TBorderRadius,
	TBorderStyle,
	TBoxShadow,
	TColors,
	TFontFamily,
	TFontSize,
	TFontStyle,
	TFontWeight,
	TLineHeight,
	TLetterSpacing,
	TScale,
	TBreakpoint,
	TEasing,
	TMerge
> {
	const shouldMerge = config.meta?.merge === true;

	/**
	 * Helper to resolve values with optional merge behavior
	 */
	function resolveValues<
		TDefault extends Record<string, TokenValue | string | number>,
		TConfig extends Record<string, TokenValue | string | number>,
	>(
		configValue: TConfig | false | undefined,
		defaultValue: TDefault,
	): TDefault | TConfig | (TDefault & TConfig) | undefined {
		if (configValue === false) {
			return undefined;
		}

		if (configValue === undefined) {
			return defaultValue;
		}

		if (shouldMerge) {
			return { ...defaultValue, ...configValue } as TDefault & TConfig;
		}

		return configValue;
	}

	// 1. Scale + ScalePowers
	let scale: Record<string, Variable> | undefined;
	let scalePowers: Record<number, TokenValue> | undefined;

	const resolvedScaleValues = resolveValues(config.scale, scaleValues);
	if (resolvedScaleValues !== undefined) {
		const scaleResult = useScale(s, resolvedScaleValues, { default: true });
		scale = scaleResult;

		if ("scale" in scaleResult) {
			scalePowers = useScalePowers(
				s,
				scaleResult.scale as Variable,
				config.scalePowers ?? scalePowerValues,
			);
		}
	}

	// 2. Spacing
	const resolvedSpacingValues = resolveValues(config.spacing, spacingValues);
	const spacing =
		resolvedSpacingValues !== undefined
			? useSpacing(s, resolvedSpacingValues, { default: true })
			: undefined;

	// 3. Border tokens
	const resolvedBorderWidthValues = resolveValues(
		config.borderWidth,
		borderWidthValues,
	);
	const borderWidth =
		resolvedBorderWidthValues !== undefined
			? useBorderWidth(s, resolvedBorderWidthValues, { default: true })
			: undefined;

	const resolvedBorderRadiusValues = resolveValues(
		config.borderRadius,
		borderRadiusValues,
	);
	const borderRadius =
		resolvedBorderRadiusValues !== undefined
			? useBorderRadius(s, resolvedBorderRadiusValues, { default: true })
			: undefined;

	const resolvedBorderStyleValues = resolveValues(
		config.borderStyle,
		borderStyleValues,
	);
	const borderStyle =
		resolvedBorderStyleValues !== undefined
			? useBorderStyle(s, resolvedBorderStyleValues, { default: true })
			: undefined;

	// 4. Box shadow
	const resolvedBoxShadowValues = resolveValues(
		config.boxShadow,
		boxShadowValues,
	);
	const boxShadow =
		resolvedBoxShadowValues !== undefined
			? useBoxShadow(s, resolvedBoxShadowValues, { default: true })
			: undefined;

	// 5. Colors
	let colors: Record<string, Variable> | undefined;
	if (config.colors !== false) {
		const resolvedColorValues = resolveValues(
			config.colors,
			colorValues,
		) as Record<string, string>;
		const colorsMetaConfig = {
			...defaultColorsMetaConfig,
			...config.meta?.colors,
		};

		const baseColors = useColor(s, resolvedColorValues, { default: true });
		colors = { ...baseColors };

		for (const colorVariable of Object.values(baseColors) as Variable[]) {
			if (colorsMetaConfig.generateLightness) {
				const lightnessVars = useColorLightness(
					s,
					colorVariable,
					colorsMetaConfig.lightnessLevels,
					{ default: true },
				);
				colors = { ...colors, ...lightnessVars };
			}

			if (colorsMetaConfig.generateShades) {
				const shadeVars = useColorShade(
					s,
					colorVariable,
					colorsMetaConfig.shadeLevels,
					{ default: true },
				);
				colors = { ...colors, ...shadeVars };
			}

			if (colorsMetaConfig.generateTints) {
				const tintVars = useColorTint(
					s,
					colorVariable,
					colorsMetaConfig.tintLevels,
					{ default: true },
				);
				colors = { ...colors, ...tintVars };
			}
		}
	}

	// 6. Typography
	const resolvedFontFamilyValues = resolveValues(
		config.fontFamily,
		fontFamilyValues,
	);
	const fontFamily =
		resolvedFontFamilyValues !== undefined
			? useFontFamily(s, resolvedFontFamilyValues, { default: true })
			: undefined;

	const resolvedFontSizeValues = resolveValues(config.fontSize, fontSizeValues);
	const fontSize =
		resolvedFontSizeValues !== undefined
			? useFontSize(s, resolvedFontSizeValues, { default: true })
			: undefined;

	const resolvedFontStyleValues = resolveValues(
		config.fontStyle,
		fontStyleValues,
	);
	const fontStyle =
		resolvedFontStyleValues !== undefined
			? useFontStyle(s, resolvedFontStyleValues, { default: true })
			: undefined;

	const resolvedFontWeightValues = resolveValues(
		config.fontWeight,
		fontWeightValues,
	);
	const fontWeight =
		resolvedFontWeightValues !== undefined
			? useFontWeight(s, resolvedFontWeightValues, { default: true })
			: undefined;

	const resolvedLineHeightValues = resolveValues(
		config.lineHeight,
		lineHeightValues,
	);
	const lineHeight =
		resolvedLineHeightValues !== undefined
			? useLineHeight(s, resolvedLineHeightValues, { default: true })
			: undefined;

	const resolvedLetterSpacingValues = resolveValues(
		config.letterSpacing,
		letterSpacingValues,
	);
	const letterSpacing =
		resolvedLetterSpacingValues !== undefined
			? useLetterSpacing(s, resolvedLetterSpacingValues, { default: true })
			: undefined;

	// 7. Breakpoints
	const resolvedBreakpointValues = resolveValues(
		config.breakpoint,
		breakpointValues,
	);
	const breakpoint =
		resolvedBreakpointValues !== undefined
			? useBreakpoint(s, resolvedBreakpointValues, { default: true })
			: undefined;

	// 8. Easing
	const resolvedEasingValues = resolveValues(config.easing, easingValues);
	const easing =
		resolvedEasingValues !== undefined
			? useEasing(s, resolvedEasingValues, { default: true })
			: undefined;

	return {
		scale,
		scalePowers,
		spacing,
		borderWidth,
		borderRadius,
		borderStyle,
		boxShadow,
		colors,
		fontFamily,
		fontSize,
		fontStyle,
		fontWeight,
		lineHeight,
		letterSpacing,
		breakpoint,
		easing,
	} as DesignTokensPresetResult<
		TSpacing,
		TBorderWidth,
		TBorderRadius,
		TBorderStyle,
		TBoxShadow,
		TColors,
		TFontFamily,
		TFontSize,
		TFontStyle,
		TFontWeight,
		TLineHeight,
		TLetterSpacing,
		TScale,
		TBreakpoint,
		TEasing,
		TMerge
	>;
}
