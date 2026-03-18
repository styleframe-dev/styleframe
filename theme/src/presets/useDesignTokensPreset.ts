import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";
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
	darkModeColorValues,
	durationValues,
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
} from "../values";
import {
	useBorderRadius,
	useBorderStyle,
	useBorderWidth,
	useBoxShadow,
	useBreakpoint,
	useColor,
	useColorLightness,
	useColorShade,
	useColorTint,
	useDuration,
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
// Domain Maps (single source of truth for types and runtime)
// =============================================================================

/**
 * Maps each simple domain key to its default values type.
 * Colors are excluded — they have special result handling (ColorResult).
 */
type DomainDefaultsMap = {
	spacing: typeof spacingValues;
	borderWidth: typeof borderWidthValues;
	borderRadius: typeof borderRadiusValues;
	borderStyle: typeof borderStyleValues;
	boxShadow: typeof boxShadowValues;
	fontFamily: typeof fontFamilyValues;
	fontSize: typeof fontSizeValues;
	fontStyle: typeof fontStyleValues;
	fontWeight: typeof fontWeightValues;
	lineHeight: typeof lineHeightValues;
	letterSpacing: typeof letterSpacingValues;
	scale: typeof scaleValues;
	breakpoint: typeof breakpointValues;
	easing: typeof easingValues;
	duration: typeof durationValues;
};

/**
 * Maps each simple domain key to its CSS property prefix.
 */
type DomainPrefixMap = {
	spacing: "spacing";
	borderWidth: "border-width";
	borderRadius: "border-radius";
	borderStyle: "border-style";
	boxShadow: "box-shadow";
	fontFamily: "font-family";
	fontSize: "font-size";
	fontStyle: "font-style";
	fontWeight: "font-weight";
	lineHeight: "line-height";
	letterSpacing: "letter-spacing";
	scale: "scale";
	breakpoint: "breakpoint";
	easing: "easing";
	duration: "duration";
};

type SimpleDomainKey = keyof DomainPrefixMap;

// =============================================================================
// Helper Types
// =============================================================================

/**
 * Extracts a domain's config type from TConfig, falling back to TDefault
 * when the key is not present in TConfig.
 */
type GetDomainConfig<
	TConfig,
	K extends string,
	TDefault,
> = K extends keyof TConfig ? TConfig[K] : TDefault;

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

// Variation level types
type DefaultLightnessLevels = typeof colorLightnessValues;
type DefaultShadeLevels = typeof colorShadeValues;
type DefaultTintLevels = typeof colorTintValues;
type DefaultColors = typeof colorValues;

/**
 * Generates all variation keys for a single color name (distributive over K)
 */
type ColorVariationsForKey<K> = K extends string
	? ExportKeys<`color.${K}`, DefaultLightnessLevels, "-"> &
			ExportKeys<`color.${K}`, DefaultShadeLevels, "-"> &
			ExportKeys<`color.${K}`, DefaultTintLevels, "-">
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
	TColors,
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
 * Per-theme token overrides. Unlike DesignTokensPresetConfig:
 * - No `false` values (themes override, not disable)
 * - No `meta` or `scalePowers` (shared config, not per-theme)
 * - No generic type parameters (theme overrides don't affect the return type)
 */
export interface ThemeTokenOverrides {
	spacing?: Record<string, TokenValue>;
	borderWidth?: Record<string, TokenValue>;
	borderRadius?: Record<string, TokenValue>;
	borderStyle?: Record<string, TokenValue>;
	boxShadow?: Record<string, TokenValue>;
	colors?: Record<string, string>;
	fontFamily?: Record<string, TokenValue>;
	fontSize?: Record<string, TokenValue>;
	fontStyle?: Record<string, TokenValue>;
	fontWeight?: Record<string, TokenValue>;
	lineHeight?: Record<string, TokenValue>;
	letterSpacing?: Record<string, TokenValue>;
	scale?: Record<string, TokenValue>;
	breakpoint?: Record<string, number>;
	easing?: Record<string, TokenValue>;
	duration?: Record<string, TokenValue>;
}

/**
 * Configuration options for the default design tokens preset.
 *
 * - Omit or set to `undefined` to use default values
 * - Set to `false` to disable the domain entirely
 * - Provide a custom record to use custom values
 * - Set `meta.merge` to `true` to merge custom values with defaults
 */
export interface DesignTokensPresetConfig<TMerge extends boolean = false> {
	spacing?: Record<string, TokenValue> | false;
	borderWidth?: Record<string, TokenValue> | false;
	borderRadius?: Record<string, TokenValue> | false;
	borderStyle?: Record<string, TokenValue> | false;
	boxShadow?: Record<string, TokenValue> | false;
	colors?: Record<string, string> | false;
	meta?: MetaConfigWithMerge<TMerge>;
	fontFamily?: Record<string, TokenValue> | false;
	fontSize?: Record<string, TokenValue> | false;
	fontStyle?: Record<string, TokenValue> | false;
	fontWeight?: Record<string, TokenValue> | false;
	lineHeight?: Record<string, TokenValue> | false;
	letterSpacing?: Record<string, TokenValue> | false;
	scale?: Record<string, TokenValue> | false;
	scalePowers?: readonly number[];
	breakpoint?: Record<string, number> | false;
	easing?: Record<string, TokenValue> | false;
	duration?: Record<string, TokenValue> | false;
	themes?: Record<string, ThemeTokenOverrides>;
}

// =============================================================================
// Result Type (mapped over domain maps)
// =============================================================================

/**
 * Result for simple domains, generated via mapped type over DomainPrefixMap.
 */
type SimpleDomainResults<TConfig, TMerge extends boolean> = {
	[K in SimpleDomainKey]: TokenResult<
		GetDomainConfig<TConfig, K, DomainDefaultsMap[K]>,
		DomainPrefixMap[K],
		DomainDefaultsMap[K],
		TMerge
	>;
};

/**
 * Result structure for the default design tokens preset.
 * Uses mapped types for simple domains, with special handling for colors and scalePowers.
 */
export type DesignTokensPresetResult<
	TConfig = {},
	TMerge extends boolean = false,
> = SimpleDomainResults<TConfig, TMerge> & {
	colors: ColorResult<
		GetDomainConfig<TConfig, "colors", DefaultColors>,
		TMerge
	>;
	scalePowers: GetDomainConfig<
		TConfig,
		"scale",
		typeof scaleValues
	> extends false
		? undefined
		: Record<number, TokenValue>;
};

// =============================================================================
// Runtime Domain Registry
// =============================================================================

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

interface DomainProcessContext {
	result: Record<string, Record<string, Variable | TokenValue> | undefined>;
	config: DesignTokensPresetConfig<boolean>;
}

interface DomainEntry {
	key: string;
	defaults: Record<string, TokenValue>;
	themes?: Record<string, Record<string, TokenValue>>;
	/**
	 * Process this domain. For simple domains, wraps the composable.
	 * For complex domains, encapsulates the full pipeline.
	 */
	process: (
		s: DeclarationsCallbackContext,
		values: Record<string, TokenValue>,
		options: { default: boolean },
		context: DomainProcessContext,
	) => Record<string, Variable | TokenValue> | undefined;
	/**
	 * Optional: simpler theme override behavior.
	 * When provided, used for theme application instead of `process`.
	 */
	applyTheme?: (
		ctx: DeclarationsCallbackContext,
		values: Record<string, TokenValue>,
	) => void;
	/**
	 * If false, this domain is not user-configurable.
	 * It derives its values from other domains (e.g., scalePowers from scale).
	 */
	configurable?: boolean;
}

/**
 * Registry mapping domain keys to their processing function and default values.
 * Used by both the main function and theme application to avoid repetition.
 */
const domainRegistry: DomainEntry[] = [
	{
		key: "scale",
		defaults: scaleValues,
		process: (s, values, options) => useScale(s, values, options),
	},
	{
		key: "spacing",
		defaults: spacingValues,
		process: (s, values, options) => useSpacing(s, values, options),
	},
	{
		key: "borderWidth",
		defaults: borderWidthValues,
		process: (s, values, options) => useBorderWidth(s, values, options),
	},
	{
		key: "borderRadius",
		defaults: borderRadiusValues,
		process: (s, values, options) => useBorderRadius(s, values, options),
	},
	{
		key: "borderStyle",
		defaults: borderStyleValues,
		process: (s, values, options) => useBorderStyle(s, values, options),
	},
	{
		key: "boxShadow",
		defaults: boxShadowValues,
		process: (s, values, options) => useBoxShadow(s, values, options),
	},
	{
		key: "fontFamily",
		defaults: fontFamilyValues,
		process: (s, values, options) => useFontFamily(s, values, options),
	},
	{
		key: "fontSize",
		defaults: fontSizeValues,
		process: (s, values, options) => useFontSize(s, values, options),
	},
	{
		key: "fontStyle",
		defaults: fontStyleValues,
		process: (s, values, options) => useFontStyle(s, values, options),
	},
	{
		key: "fontWeight",
		defaults: fontWeightValues,
		process: (s, values, options) => useFontWeight(s, values, options),
	},
	{
		key: "lineHeight",
		defaults: lineHeightValues,
		process: (s, values, options) => useLineHeight(s, values, options),
	},
	{
		key: "letterSpacing",
		defaults: letterSpacingValues,
		process: (s, values, options) => useLetterSpacing(s, values, options),
	},
	{
		key: "breakpoint",
		defaults: breakpointValues,
		process: (s, values, options) => useBreakpoint(s, values, options),
	},
	{
		key: "easing",
		defaults: easingValues,
		process: (s, values, options) => useEasing(s, values, options),
	},
	{
		key: "duration",
		defaults: durationValues,
		process: (s, values, options) => useDuration(s, values, options),
	},
	{
		key: "colors",
		defaults: colorValues as Record<string, TokenValue>,
		themes: {
			dark: darkModeColorValues,
		},
		process: (s, values, options, { config }) => {
			const baseColors = useColor(s, values as Record<string, string>, options);
			let result: Record<string, Variable> = { ...baseColors };

			const meta = { ...defaultColorsMetaConfig, ...config.meta?.colors };

			for (const colorVariable of Object.values(
				baseColors,
			) as Variable<string>[]) {
				if (meta.generateLightness) {
					result = {
						...result,
						...useColorLightness(
							s,
							colorVariable,
							meta.lightnessLevels,
							options,
						),
					};
				}

				if (meta.generateShades) {
					result = {
						...result,
						...useColorShade(s, colorVariable, meta.shadeLevels, options),
					};
				}

				if (meta.generateTints) {
					result = {
						...result,
						...useColorTint(s, colorVariable, meta.tintLevels, options),
					};
				}
			}

			return result;
		},
		applyTheme: (ctx, values) => {
			useColor(ctx, values as Record<string, string>, { default: false });
		},
	},
	{
		key: "scalePowers",
		defaults: {},
		configurable: false,
		process: (s, _values, _options, { result, config }) => {
			const scaleVar = result.scale?.["scale"];
			if (!scaleVar) return undefined;
			return useScalePowers(
				s,
				scaleVar as Variable,
				config.scalePowers ?? scalePowerValues,
			);
		},
	},
];

/**
 * Collect all unique non-default theme names from config and domain-level defaults.
 */
function collectThemeNames(
	configThemes: Record<string, ThemeTokenOverrides> | undefined,
): Set<string> {
	const names = new Set<string>();

	if (configThemes) {
		for (const name of Object.keys(configThemes)) {
			if (name !== "default") names.add(name);
		}
	}

	for (const { themes: domainThemes } of domainRegistry) {
		if (domainThemes) {
			for (const name of Object.keys(domainThemes)) {
				names.add(name);
			}
		}
	}

	return names;
}

// =============================================================================
// Main Preset Function
// =============================================================================

/**
 * Create a complete design token system with sensible defaults.
 *
 * @param s - The Styleframe instance
 * @param config - Configuration options for customizing the preset
 * @returns An object containing all generated design token variables
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
export function useDesignTokensPreset(
	s: Styleframe,
): DesignTokensPresetResult<{}, false>;
export function useDesignTokensPreset<
	TConfig extends DesignTokensPresetConfig<TMerge>,
	TMerge extends boolean = false,
>(s: Styleframe, config: TConfig): DesignTokensPresetResult<TConfig, TMerge>;
export function useDesignTokensPreset(
	s: Styleframe,
	config: DesignTokensPresetConfig<boolean> = {},
): DesignTokensPresetResult {
	const shouldMerge = config.meta?.merge === true;
	const defaultThemeOverrides = config.themes?.default;

	// Process all domains via the unified registry
	const result: Record<
		string,
		Record<string, Variable | TokenValue> | undefined
	> = {};
	const context: DomainProcessContext = { result, config };

	for (const entry of domainRegistry) {
		if (entry.configurable === false) {
			// Non-configurable domains derive from other domains
			result[entry.key] = entry.process(s, {}, { default: true }, context);
			continue;
		}

		const configValue =
			(config as Record<string, unknown>)[entry.key] ??
			defaultThemeOverrides?.[entry.key as keyof ThemeTokenOverrides];

		if (configValue === false) {
			result[entry.key] = undefined;
			continue;
		}

		const values =
			configValue != null
				? shouldMerge
					? {
							...entry.defaults,
							...(configValue as Record<string, TokenValue>),
						}
					: (configValue as Record<string, TokenValue>)
				: entry.defaults;

		result[entry.key] = entry.process(s, values, { default: true }, context);
	}

	// Apply non-default themes (from both config and domain-level defaults)
	const allThemeNames = collectThemeNames(config.themes);
	for (const themeName of allThemeNames) {
		s.theme(themeName, (ctx) => {
			const userOverrides =
				config.themes?.[themeName] ?? ({} as ThemeTokenOverrides);

			for (const entry of domainRegistry) {
				if (entry.configurable === false) continue;

				const themeValues =
					userOverrides[entry.key as keyof ThemeTokenOverrides] ??
					entry.themes?.[themeName];

				if (themeValues) {
					if (entry.applyTheme) {
						entry.applyTheme(ctx, themeValues as Record<string, TokenValue>);
					} else {
						entry.process(
							ctx,
							themeValues as Record<string, TokenValue>,
							{ default: false },
							{ result: {}, config },
						);
					}
				}
			}
		});
	}

	return result as DesignTokensPresetResult;
}
