import {
	isKeyReferenceValue,
	type DeclarationsCallbackContext,
	type Styleframe,
	type TokenValue,
	type Variable,
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
	useBorderColorDesignTokens,
	useBorderRadiusDesignTokens,
	useBorderStyleDesignTokens,
	useBorderWidthDesignTokens,
	useBoxShadowDesignTokens,
	useBreakpointDesignTokens,
	useColorDesignTokens,
	useColorLightnessDesignTokens,
	useColorShadeDesignTokens,
	useColorTintDesignTokens,
	useDurationDesignTokens,
	useEasingDesignTokens,
	useFontFamilyDesignTokens,
	useFontSizeDesignTokens,
	useFontStyleDesignTokens,
	useFontWeightDesignTokens,
	useLetterSpacingDesignTokens,
	useLineHeightDesignTokens,
	useScaleDesignTokens,
	useScalePowersDesignTokens,
	useSpacingDesignTokens,
	useZIndexDesignTokens,
} from "../variables";

// =============================================================================
// Domain Registry (single source of truth for types and runtime)
// =============================================================================

interface DomainProcessContext {
	result: Record<string, Variable | TokenValue>;
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
	defineDomain({
		key: "scale",
		defaults: scaleValues,
		composable: useScaleDesignTokens,
	}),
	defineDomain({
		key: "spacing",
		defaults: spacingValues,
		composable: useSpacingDesignTokens,
	}),
	defineDomain({
		key: "border-width",
		defaults: borderWidthValues,
		composable: useBorderWidthDesignTokens,
	}),
	defineDomain({
		key: "border-radius",
		defaults: borderRadiusValues,
		composable: useBorderRadiusDesignTokens,
	}),
	defineDomain({
		key: "border-style",
		defaults: borderStyleValues,
		composable: useBorderStyleDesignTokens,
	}),
	defineDomain({
		key: "box-shadow",
		defaults: boxShadowValues,
		composable: useBoxShadowDesignTokens,
	}),
	defineDomain({
		key: "z-index",
		defaults: zIndexValues,
		composable: useZIndexDesignTokens,
	}),
	defineDomain({
		key: "font-family",
		defaults: fontFamilyValues,
		composable: useFontFamilyDesignTokens,
	}),
	defineDomain({
		key: "font-size",
		defaults: fontSizeValues,
		composable: useFontSizeDesignTokens,
	}),
	defineDomain({
		key: "font-style",
		defaults: fontStyleValues,
		composable: useFontStyleDesignTokens,
	}),
	defineDomain({
		key: "font-weight",
		defaults: fontWeightValues,
		composable: useFontWeightDesignTokens,
	}),
	defineDomain({
		key: "line-height",
		defaults: lineHeightValues,
		composable: useLineHeightDesignTokens,
	}),
	defineDomain({
		key: "letter-spacing",
		defaults: letterSpacingValues,
		composable: useLetterSpacingDesignTokens,
	}),
	defineDomain({
		key: "breakpoint",
		defaults: breakpointValues,
		composable: useBreakpointDesignTokens,
	}),
	defineDomain({
		key: "easing",
		defaults: easingValues,
		composable: useEasingDesignTokens,
	}),
	defineDomain({
		key: "duration",
		defaults: durationValues,
		composable: useDurationDesignTokens,
	}),
	defineDomain({
		key: "colors",
		defaults: colorValues as Record<string, TokenValue>,
		themes: {
			dark: darkModeColorValues,
		},
		composable: (s, values, options, { config }) => {
			// Partition values into base colors (hex) and reference colors (@...)
			const baseColorValues: Record<string, string> = {};
			const referenceColorValues: Record<string, string> = {};

			for (const [key, value] of Object.entries(values)) {
				if (isKeyReferenceValue(value)) {
					referenceColorValues[key] = value as string;
				} else {
					baseColorValues[key] = value as string;
				}
			}

			// Create base color variables + generate variations
			const baseColors = useColorDesignTokens(s, baseColorValues, options);
			let result: Record<string, Variable> = { ...baseColors };

			const meta = { ...defaultColorsMetaConfig, ...config.meta?.colors };

			for (const colorVariable of Object.values(
				baseColors,
			) as Variable<string>[]) {
				if (meta.generateLightness) {
					result = {
						...result,
						...useColorLightnessDesignTokens(
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
						...useColorShadeDesignTokens(
							s,
							colorVariable,
							meta.shadeLevels,
							options,
						),
					};
				}

				if (meta.generateTints) {
					result = {
						...result,
						...useColorTintDesignTokens(
							s,
							colorVariable,
							meta.tintLevels,
							options,
						),
					};
				}
			}

			// Create reference color variables (shade/tint vars now exist)
			if (Object.keys(referenceColorValues).length > 0) {
				const referenceColors = useColorDesignTokens(
					s,
					referenceColorValues,
					options,
				);
				result = { ...result, ...referenceColors };
			}

			return result;
		},
	}),
	defineDomain({
		key: "border-color",
		defaults: borderColorValues,
		composable: useBorderColorDesignTokens,
		themes: { dark: darkModeBorderColorValues },
	}),
	defineDomain({
		key: "scale-powers",
		defaults: {} as Record<string, TokenValue>,
		configurable: false,
		composable: (s, _values, _options, { result, config }) => {
			const scaleVar = result["scale"];
			if (!scaleVar) return undefined;
			return useScalePowersDesignTokens(
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
 * Extracts the merge flag from config by structural matching.
 * Returns `true` only when config literally has `meta: { merge: true }`.
 */
type ExtractMerge<T> = T extends { meta: { merge: true } } ? true : false;

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
			? [TMerge] extends [true]
				? Omit<TDefault, keyof TConfig> & TConfig
				: TConfig
			: TDefault;

/**
 * Generates ExportKeys or empty object based on config.
 * Returns {} for disabled domains so they contribute no keys to the flat intersection.
 */
type FlatTokenResult<
	TConfig,
	TPrefix extends string,
	TDefault extends Record<string, unknown>,
	TMerge extends boolean = false,
> = TConfig extends false
	? {}
	: ExportKeys<TPrefix, ResolveTokens<TConfig, TDefault, TMerge>>;

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
	? [TMerge] extends [true]
		? Omit<DefaultColors, keyof TColors> & TColors
		: TColors
	: DefaultColors;

/**
 * Color result type that strongly types base colors and all variations.
 * Returns {} for disabled colors so they contribute no keys to the flat intersection.
 */
type FlatColorResult<
	TColors,
	TMerge extends boolean = false,
> = TColors extends false
	? {}
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
 * - No `meta`, `scalePowers`, or `themes` (shared config, not per-theme)
 */
type ConfigurableDomainKeys = Exclude<
	keyof DesignTokensPresetConfig,
	"meta" | "scalePowers" | "themes"
>;

export type ThemeTokenOverrides = {
	[K in ConfigurableDomainKeys]?: DesignTokensPresetConfig[K];
};

// =============================================================================
// Result Type (flat intersection of all domain ExportKeys)
// =============================================================================

/**
 * Flat result for simple domains — intersection of all ExportKeys for enabled domains.
 * Each domain contributes its variable keys directly (or {} if disabled).
 */
type FlatSimpleDomainResults<
	TConfig,
	TMerge extends boolean,
> = UnionToIntersection<
	{
		[K in SimpleDomainKey]: FlatTokenResult<
			GetDomainConfig<TConfig, CamelCase<K>, DomainDefaultsMap[K]>,
			K,
			DomainDefaultsMap[K],
			TMerge
		>;
	}[SimpleDomainKey]
>;

/**
 * scalePowers result — stays nested since its keys are numbers.
 */
type ScalePowersResult<TScaleConfig> = TScaleConfig extends false
	? {}
	: { scalePowers: Record<number, TokenValue> };

/**
 * Flat result structure for the design tokens preset.
 * All variable keys are directly accessible (no domain grouping).
 * Only `scalePowers` remains nested (numeric keys).
 */
export type DesignTokensPresetResult<
	TConfig = {},
	TMerge extends boolean = false,
> = FlatSimpleDomainResults<TConfig, TMerge> &
	FlatColorResult<GetDomainConfig<TConfig, "colors", DefaultColors>, TMerge> &
	ScalePowersResult<GetDomainConfig<TConfig, "scale", typeof scaleValues>>;

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
 * @returns A flat object containing all generated design token variables
 *
 * @example
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useDesignTokensPreset } from "@styleframe/theme";
 *
 * const s = styleframe();
 *
 * // Use all defaults — destructure directly
 * const { colorPrimary, spacingMd, borderRadiusMd } = useDesignTokensPreset(s);
 *
 * // Customize specific domains
 * const { colorPrimary, spacingSm } = useDesignTokensPreset(s, {
 *     colors: { primary: "#ff6600", secondary: "#333" },
 *     spacing: { default: "0.5rem", sm: "0.25rem" },
 *     easing: false, // Disable easing entirely
 * });
 *
 * // scalePowers stays nested (numeric keys)
 * const { scalePowers } = useDesignTokensPreset(s);
 * const power = scalePowers[-1];
 * ```
 */
export function useDesignTokensPreset(
	s: Styleframe,
): DesignTokensPresetResult<{}, false>;
export function useDesignTokensPreset<
	TConfig extends DesignTokensPresetConfig<boolean>,
>(
	s: Styleframe,
	config: TConfig,
): DesignTokensPresetResult<TConfig, ExtractMerge<TConfig>>;
export function useDesignTokensPreset(
	s: Styleframe,
	config: DesignTokensPresetConfig<boolean> = {},
): DesignTokensPresetResult {
	const shouldMerge = config.meta?.merge === true;
	const defaultThemeOverrides = config.themes?.default;

	const result: Record<string, Variable | TokenValue> = {};
	const context: DomainProcessContext = { result, config };
	const disabledDomains = new Set<string>();

	for (const entry of domains) {
		const configKey = camelCase(entry.key);

		if (entry.configurable === false) {
			const domainResult = entry.composable(
				s,
				entry.defaults,
				{ default: true },
				context,
			);
			if (domainResult) {
				// scalePowers stays nested (numeric keys)
				if (configKey === "scalePowers") {
					(result as Record<string, unknown>).scalePowers = domainResult;
				} else {
					Object.assign(result, domainResult);
				}
			}
			continue;
		}

		const configValue =
			(config as Record<string, unknown>)[configKey] ??
			defaultThemeOverrides?.[configKey as keyof ThemeTokenOverrides];

		if (configValue === false) {
			disabledDomains.add(configKey);
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

		const domainResult = entry.composable(
			s,
			values,
			{ default: true },
			context,
		);
		if (domainResult) {
			Object.assign(result, domainResult);
		}
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

				// Skip domains disabled at root level
				if (disabledDomains.has(configKey)) continue;

				const themeValues =
					userOverrides[configKey as keyof ThemeTokenOverrides] ??
					entry.themes?.[themeName];

				if (themeValues && themeValues !== (false as unknown)) {
					entry.composable(
						ctx,
						themeValues as Record<string, TokenValue>,
						{ default: false },
						{ result: {} as Record<string, Variable | TokenValue>, config },
					);
				}
			}
		});
	}

	return result as unknown as DesignTokensPresetResult;
}
