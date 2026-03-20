import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";
import type { CamelCase } from "scule";
import { camelCase } from "scule";
import type { ExportKeys } from "../types";
import {
	borderColorValues,
	borderRadiusValues,
	borderStyleValues,
	borderWidthValues,
	boxShadowValues,
	breakpointValues,
	colorLightnessValues,
	colorShadeValues,
	colorTintValues,
	colorValues,
	darkModeBorderColorValues,
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
	zIndexValues,
} from "../values";
import {
	useBorderColor,
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
	useZIndex,
} from "../variables";

// =============================================================================
// Domain Registry (single source of truth for types and runtime)
// =============================================================================

interface DomainProcessContext {
	result: Record<string, Record<string, Variable | TokenValue> | undefined>;
	config: DesignTokensPresetConfig<boolean>;
}

type DomainComposable = (
	s: DeclarationsCallbackContext,
	values: Record<string, TokenValue>,
	options: { default: boolean },
	context: DomainProcessContext,
) => Record<string, Variable | TokenValue> | undefined;

interface Domain<
	K extends string = string,
	D extends Record<string, TokenValue> = Record<string, TokenValue>,
	C extends boolean | undefined = boolean | undefined,
> {
	key: K;
	defaults: D;
	composable: DomainComposable;
	themes?: Record<string, Record<string, TokenValue>>;
	configurable: C;
}

/**
 * Defines a domain entry, preserving literal types for `key`, `defaults`,
 * and `configurable` while widening `composable` to `DomainComposable`.
 */
function defineDomain<
	K extends string,
	D extends Record<string, TokenValue>,
	C extends boolean | undefined = undefined,
>(domain: {
	key: K;
	defaults: D;
	composable: DomainComposable;
	themes?: Record<string, Record<string, TokenValue>>;
	configurable?: C;
}): Domain<K, D, C> {
	return domain as Domain<K, D, C>;
}

/**
 * Registry of all domains in application order.
 * Order matters — domains that reference variables from other domains
 * (e.g., border-color references color variables) must come after them.
 *
 * Each domain's `key` is a kebab-case identifier. The camelCase config/result
 * key is derived at runtime via `camelCase(key)`.
 */
const domains = [
	defineDomain({ key: "scale", defaults: scaleValues, composable: useScale }),
	defineDomain({
		key: "spacing",
		defaults: spacingValues,
		composable: useSpacing,
	}),
	defineDomain({
		key: "border-width",
		defaults: borderWidthValues,
		composable: useBorderWidth,
	}),
	defineDomain({
		key: "border-radius",
		defaults: borderRadiusValues,
		composable: useBorderRadius,
	}),
	defineDomain({
		key: "border-style",
		defaults: borderStyleValues,
		composable: useBorderStyle,
	}),
	defineDomain({
		key: "box-shadow",
		defaults: boxShadowValues,
		composable: useBoxShadow,
	}),
	defineDomain({
		key: "z-index",
		defaults: zIndexValues,
		composable: useZIndex,
	}),
	defineDomain({
		key: "font-family",
		defaults: fontFamilyValues,
		composable: useFontFamily,
	}),
	defineDomain({
		key: "font-size",
		defaults: fontSizeValues,
		composable: useFontSize,
	}),
	defineDomain({
		key: "font-style",
		defaults: fontStyleValues,
		composable: useFontStyle,
	}),
	defineDomain({
		key: "font-weight",
		defaults: fontWeightValues,
		composable: useFontWeight,
	}),
	defineDomain({
		key: "line-height",
		defaults: lineHeightValues,
		composable: useLineHeight,
	}),
	defineDomain({
		key: "letter-spacing",
		defaults: letterSpacingValues,
		composable: useLetterSpacing,
	}),
	defineDomain({
		key: "breakpoint",
		defaults: breakpointValues,
		composable: useBreakpoint,
	}),
	defineDomain({
		key: "easing",
		defaults: easingValues,
		composable: useEasing,
	}),
	defineDomain({
		key: "duration",
		defaults: durationValues,
		composable: useDuration,
	}),
	defineDomain({
		key: "colors",
		defaults: colorValues as Record<string, TokenValue>,
		themes: { dark: darkModeColorValues },
		composable: (s, values, options, { config }) => {
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
	}),
	defineDomain({
		key: "border-color",
		defaults: borderColorValues,
		composable: useBorderColor,
		themes: { dark: darkModeBorderColorValues },
	}),
	defineDomain({
		key: "scale-powers",
		defaults: {} as Record<string, TokenValue>,
		configurable: false,
		composable: (s, _values, _options, { result, config }) => {
			const scaleVar = result.scale?.["scale"];
			if (!scaleVar) return undefined;
			return useScalePowers(
				s,
				scaleVar as Variable,
				config.scalePowers ?? scalePowerValues,
			);
		},
	}),
];

// =============================================================================
// Domain Type Maps (derived from the domains tuple)
// =============================================================================

type Domains = typeof domains;
type AllDomains = Domains[number];
type ConfigurableDomain = Exclude<AllDomains, { configurable: false }>;
type SimpleDomain = Exclude<ConfigurableDomain, { key: "colors" }>;
type SimpleDomainKey = SimpleDomain["key"];
type DomainByKey<K extends string> = Extract<SimpleDomain, { key: K }>;

/** Maps each simple domain key to its default values type. */
type DomainDefaultsMap = {
	[K in SimpleDomainKey]: DomainByKey<K>["defaults"];
};

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
 * Resolves which color record to use based on config and merge flag.
 */
type ResolvedColors<TColors, TMerge extends boolean> = TColors extends Record<
	string,
	string
>
	? TMerge extends true
		? Omit<DefaultColors, keyof TColors> & TColors
		: TColors
	: DefaultColors;

/**
 * Color result type that strongly types base colors and all variations.
 */
type ColorResult<
	TColors,
	TMerge extends boolean = false,
> = TColors extends false
	? undefined
	: ExportKeys<"color", ResolvedColors<TColors, TMerge>, "."> &
			AllColorVariations<ResolvedColors<TColors, TMerge>>;

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
 *
 * - Omit or set to `undefined` to use default values
 * - Set to `false` to disable the domain entirely
 * - Provide a custom record to use custom values
 * - Set `meta.merge` to `true` to merge custom values with defaults
 */
export interface DesignTokensPresetConfig<TMerge extends boolean = false> {
	spacing?: Record<string, TokenValue> | false;
	borderColor?: Record<string, TokenValue> | false;
	borderWidth?: Record<string, TokenValue> | false;
	borderRadius?: Record<string, TokenValue> | false;
	borderStyle?: Record<string, TokenValue> | false;
	boxShadow?: Record<string, TokenValue> | false;
	zIndex?: Record<string, TokenValue> | false;
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

/**
 * Per-theme token overrides derived from DesignTokensPresetConfig:
 * - No `false` values (themes override, not disable)
 * - No `meta`, `scalePowers`, or `themes` (shared config, not per-theme)
 */
type ConfigurableDomainKeys = Exclude<
	keyof DesignTokensPresetConfig,
	"meta" | "scalePowers" | "themes"
>;

export type ThemeTokenOverrides = {
	[K in ConfigurableDomainKeys]?: Exclude<DesignTokensPresetConfig[K], false>;
};

// =============================================================================
// Result Type (mapped over domain maps)
// =============================================================================

/**
 * Result for simple domains, generated via mapped type over the domains tuple.
 * Maps kebab-case domain keys to camelCase result keys.
 */
type SimpleDomainResults<TConfig, TMerge extends boolean> = {
	[K in SimpleDomainKey as CamelCase<K>]: TokenResult<
		GetDomainConfig<TConfig, CamelCase<K>, DomainDefaultsMap[K]>,
		K,
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
// Runtime Helpers
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

	for (const { themes: domainThemes } of domains) {
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

	const result: Record<
		string,
		Record<string, Variable | TokenValue> | undefined
	> = {};
	const context: DomainProcessContext = { result, config };

	for (const entry of domains) {
		const configKey = camelCase(entry.key);

		if (entry.configurable === false) {
			result[configKey] = entry.composable(
				s,
				entry.defaults,
				{ default: true },
				context,
			);
			continue;
		}

		const configValue =
			(config as Record<string, unknown>)[configKey] ??
			defaultThemeOverrides?.[configKey as keyof ThemeTokenOverrides];

		if (configValue === false) {
			result[configKey] = undefined;
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

		result[configKey] = entry.composable(s, values, { default: true }, context);
	}

	// Apply non-default themes (from both config and domain-level defaults)
	const allThemeNames = collectThemeNames(config.themes);
	for (const themeName of allThemeNames) {
		s.theme(themeName, (ctx) => {
			const userOverrides =
				config.themes?.[themeName] ?? ({} as ThemeTokenOverrides);

			for (const entry of domains) {
				if (entry.configurable === false) continue;

				const configKey = camelCase(entry.key);
				const themeValues =
					userOverrides[configKey as keyof ThemeTokenOverrides] ??
					entry.themes?.[themeName];

				if (themeValues) {
					entry.composable(
						ctx,
						themeValues as Record<string, TokenValue>,
						{ default: false },
						{ result: {}, config },
					);
				}
			}
		});
	}

	return result as DesignTokensPresetResult;
}
