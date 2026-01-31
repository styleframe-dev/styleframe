import type { Styleframe, Variable } from "@styleframe/core";
import { type Oklch, oklch, clampChroma, formatHex } from "culori";

// =============================================================================
// Color Utilities
// =============================================================================

function hexToOklch(hex: string): Oklch {
	const color = oklch(hex);
	if (!color) {
		throw new Error(`Invalid hex color: ${hex}`);
	}
	return color;
}

function gamutMapOklch(color: Oklch): Oklch {
	return clampChroma(color, "oklch");
}

function oklchToHex(color: Oklch): string {
	const clamped = clampChroma(color, "oklch");
	return formatHex(clamped) ?? "#000000";
}

// =============================================================================
// Color Scale Generation Algorithm
// =============================================================================

/**
 * Lightness curve coefficients for light mode.
 * Each value represents the fraction of distance from white (0.995) to the base lightness.
 */
const LIGHT_LIGHTNESS_CURVE = [
	0.005, // step 1: app background
	0.037, // step 2: subtle background
	0.102, // step 3: ui element background
	0.164, // step 4: hovered ui element
	0.26, // step 5: active ui element
	0.381, // step 6: subtle borders
	0.536, // step 7: borders
	0.72, // step 8: strong borders (reduced to match Radix better)
	1.0, // step 9: solid backgrounds (base)
	1.078, // step 10: hovered solid
	1.27, // step 11: low contrast text
	1.94, // step 12: high contrast text
] as const;

/**
 * Lightness curve coefficients for dark mode.
 * Each value represents the fraction of distance from black (0.17) to the base lightness.
 * Steps 11-12 are boosted significantly to ensure readable light text.
 */
const DARK_LIGHTNESS_CURVE = [
	0.01, // step 1: app background
	0.045, // step 2: subtle background
	0.18, // step 3: ui element background
	0.285, // step 4: hovered ui element
	0.39, // step 5: active ui element
	0.49, // step 6: subtle borders
	0.615, // step 7: borders
	0.765, // step 8: strong borders
	1.0, // step 9: solid backgrounds (base)
	1.085, // step 10: hovered solid
	1.55, // step 11: low contrast text (significantly boosted)
	1.95, // step 12: high contrast text (significantly boosted)
] as const;

/**
 * Chroma curve coefficients for light mode.
 * Each value is a multiplier of the base chroma.
 * Steps 1-2 use very low chroma for subtle, near-white backgrounds.
 */
const LIGHT_CHROMA_CURVE = [
	0.02, // step 1: nearly achromatic
	0.05, // step 2: hint of color
	0.11, // step 3
	0.19, // step 4: slightly increased
	0.28, // step 5: slightly increased
	0.38, // step 6: slightly increased
	0.5, // step 7: increased for better gradient
	0.68, // step 8: increased to match Radix
	1.0, // step 9: full chroma
	0.95, // step 10
	0.9, // step 11: increased for better text contrast
	0.55, // step 12: slightly increased
] as const;

/**
 * Chroma curve coefficients for dark mode.
 * Each value is a multiplier of the base chroma.
 * Steps 1-2 use low chroma for subtle, near-black backgrounds.
 * Steps 11-12 maintain high chroma for colorful light text.
 */
const DARK_CHROMA_CURVE = [
	0.08, // step 1: nearly achromatic
	0.12, // step 2: hint of color
	0.32, // step 3
	0.48, // step 4
	0.55, // step 5
	0.6, // step 6
	0.66, // step 7
	0.76, // step 8
	1.0, // step 9: full chroma
	0.8, // step 10
	0.7, // step 11: colorful light text
	0.55, // step 12: maintain visible color at high lightness
] as const;

/**
 * Edge lightness values for light and dark modes.
 */
const LIGHT_EDGE = 0.995;
const DARK_EDGE = 0.17;

/**
 * Hue shift curves for light mode.
 * Positive values shift toward yellow/warm, negative toward cyan/cool.
 * Values are multiplied by a hue-dependent factor.
 */
const LIGHT_HUE_SHIFT_CURVE = [
	0.9, // step 1: strongest shift for subtle backgrounds
	0.85, // step 2
	0.75, // step 3
	0.6, // step 4
	0.45, // step 5
	0.32, // step 6
	0.2, // step 7
	0.1, // step 8
	0.0, // step 9: base (no shift)
	-0.05, // step 10: slight opposite shift
	-0.05, // step 11
	-0.15, // step 12: moderate opposite shift for contrast
] as const;

/**
 * Hue shift curves for dark mode.
 * Similar pattern but with different magnitudes.
 */
const DARK_HUE_SHIFT_CURVE = [
	0.3, // step 1: moderate shift for dark backgrounds
	0.25, // step 2
	0.2, // step 3
	0.15, // step 4
	0.1, // step 5
	0.08, // step 6
	0.05, // step 7
	0.02, // step 8
	0.0, // step 9: base (no shift)
	-0.02, // step 10
	-0.05, // step 11
	-0.1, // step 12
] as const;

/**
 * Calculate the hue shift direction and magnitude based on the base hue.
 * Different hue ranges shift in different directions to maintain perceptual warmth.
 *
 * @param baseHue - The base hue in degrees (0-360)
 * @returns The maximum hue shift in degrees (positive = toward yellow/warm)
 */
function getHueShiftMagnitude(baseHue: number): number {
	// Normalize hue to 0-360
	const h = ((baseHue % 360) + 360) % 360;

	// Orange/yellow range (30-80°): shift toward yellow (positive)
	// These colors benefit most from shifting lighter tints toward yellow
	if (h >= 30 && h <= 80) {
		return 35; // Strong shift toward yellow for orange
	}

	// Red range (0-30° or 350-360°): moderate shift toward orange
	if (h < 30 || h >= 350) {
		return -10; // Shift toward orange (lower hue)
	}

	// Yellow-green range (80-120°): minimal shift
	if (h >= 80 && h <= 120) {
		return 5; // Slight shift toward yellow
	}

	// Green range (120-160°): minimal shift
	if (h > 120 && h <= 160) {
		return 3; // Very slight shift
	}

	// Cyan-green range (160-200°): shift toward cyan
	if (h > 160 && h <= 200) {
		return -5; // Slight shift toward cyan
	}

	// Blue range (200-260°): shift toward cyan for lighter steps
	if (h > 200 && h <= 260) {
		return -18; // Shift toward cyan
	}

	// Blue-violet range (260-290°): moderate shift toward blue
	if (h > 260 && h <= 290) {
		return -12;
	}

	// Purple/violet range (290-350°): shift toward pink/magenta
	if (h > 290 && h < 350) {
		return 20; // Shift toward pink (higher hue, wrapping toward red)
	}

	return 0;
}

/**
 * Apply hue shift to a color based on the step and mode.
 * This creates more natural color progressions by shifting lighter
 * tints toward warmer hues and darker shades toward cooler hues.
 *
 * @param baseHue - The base hue in degrees
 * @param step - The color scale step (1-12)
 * @param mode - Light or dark mode
 * @returns The shifted hue in degrees
 */
export function applyHueShift(
	baseHue: number,
	step: ColorScaleStep,
	mode: "light" | "dark",
): number {
	const shiftCurve =
		mode === "light" ? LIGHT_HUE_SHIFT_CURVE : DARK_HUE_SHIFT_CURVE;
	const magnitude = getHueShiftMagnitude(baseHue);
	const shiftFactor = shiftCurve[step - 1]!;

	const shift = magnitude * shiftFactor;
	let newHue = baseHue + shift;

	// Normalize to 0-360
	newHue = ((newHue % 360) + 360) % 360;

	return newHue;
}

/**
 * Get a chroma multiplier based on the base hue.
 * Different colors benefit from chroma adjustments at different steps.
 *
 * @param baseHue - The base hue in degrees
 * @param step - The color scale step
 * @param mode - Light or dark mode
 * @returns A multiplier to apply to the base chroma curve value
 */
function getChromaMultiplier(
	baseHue: number,
	step: ColorScaleStep,
	mode: "light" | "dark",
): number {
	const h = ((baseHue % 360) + 360) % 360;

	if (mode === "light") {
		// Orange/yellow range (30-80°): boost chroma for warmer tints in mid-steps
		if (h >= 30 && h <= 80 && step >= 3 && step <= 7) {
			const boostCurve = [
				0, 0, 1.15, 1.25, 1.3, 1.25, 1.15, 1.0, 1.0, 1.0, 1.0, 1.0,
			];
			return boostCurve[step - 1]!;
		}
	} else {
		// Dark mode: boost chroma for step 11 only for greens (H ~150-165)
		// Green specifically needs higher saturation for vibrant light text
		if (h >= 145 && h <= 170 && step === 11) {
			return 1.5; // Strong boost for green step 11
		}
	}

	return 1.0;
}

export type ColorScaleStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const colorScaleSteps: readonly ColorScaleStep[] = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
] as const;

/**
 * Minimum lightness floors for specific steps.
 * These prevent extreme steps from going too dark/light regardless of base color.
 */
const LIGHT_MIN_LIGHTNESS: Partial<Record<ColorScaleStep, number>> = {
	11: 0.5, // Ensure step 11 text is readable
	12: 0.3, // Ensure step 12 text has good contrast but isn't too dark
};

const DARK_MAX_LIGHTNESS: Partial<Record<ColorScaleStep, number>> = {
	11: 0.8, // Cap step 11 to avoid being too washed out
	12: 0.91, // Cap step 12 for subtle light text
};

/**
 * Get hue-specific lightness adjustment for step 12 in light mode.
 * Some colors (like orange) need to go darker than the universal minimum.
 */
function getStep12MinLightness(baseHue: number): number {
	const h = ((baseHue % 360) + 360) % 360;

	// Orange/warm colors (30-80°): allow darker step 12 for better contrast
	if (h >= 30 && h <= 80) {
		return 0.25;
	}

	// Default minimum
	return 0.3;
}

/**
 * Generate a 12-step color scale from a single base color.
 *
 * @param baseHex - The base color as a hex string (e.g., '#0090ff')
 * @param mode - 'light' or 'dark' mode
 * @returns An object with steps 1-12 as hex color strings
 */
export function generateColorScale(
	baseHex: string,
	mode: "light" | "dark" = "light",
): Record<ColorScaleStep, string> {
	const base = hexToOklch(baseHex);

	const lightnessCurve =
		mode === "light" ? LIGHT_LIGHTNESS_CURVE : DARK_LIGHTNESS_CURVE;
	const chromaCurve = mode === "light" ? LIGHT_CHROMA_CURVE : DARK_CHROMA_CURVE;
	const lightEdge = mode === "light" ? LIGHT_EDGE : DARK_EDGE;
	const range = base.l - lightEdge;

	const result = {} as Record<ColorScaleStep, string>;

	for (let i = 1; i <= 12; i++) {
		const step = i as ColorScaleStep;
		let targetL = lightEdge + lightnessCurve[i - 1]! * range;

		// Apply mode-specific lightness constraints
		if (mode === "light") {
			let minL = LIGHT_MIN_LIGHTNESS[step];
			// Use hue-specific minimum for step 12
			if (step === 12) {
				minL = getStep12MinLightness(base.h ?? 0);
			}
			if (minL !== undefined) {
				targetL = Math.max(minL, targetL);
			}
			targetL = Math.max(0.05, Math.min(0.98, targetL));
		} else {
			const maxL = DARK_MAX_LIGHTNESS[step];
			if (maxL !== undefined) {
				targetL = Math.min(maxL, targetL);
			}
			targetL = Math.max(0.05, Math.min(0.98, targetL));
		}

		// Apply hue shift and chroma adjustments based on step and mode
		const baseHue = base.h ?? 0;
		const chromaMultiplier = getChromaMultiplier(baseHue, step, mode);
		const targetC = base.c * chromaCurve[i - 1]! * chromaMultiplier;
		const targetH = applyHueShift(baseHue, step, mode);

		const mapped = gamutMapOklch({
			mode: "oklch",
			l: targetL,
			c: targetC,
			h: targetH,
		});
		result[step] = oklchToHex(mapped);
	}

	return result;
}

/**
 * Get the OKLCH values from a hex color.
 * Useful for understanding a color's properties.
 */
export function getColorProperties(hex: string): {
	lightness: number;
	chroma: number;
	hue: number;
} {
	const { l, c, h } = hexToOklch(hex);
	return { lightness: l, chroma: c, hue: h ?? 0 };
}

// =============================================================================
// Preset Types
// =============================================================================

/**
 * Configuration for generating color scales.
 */
export interface GeneratedColorScalePresetConfig<
	TScales extends Record<string, string> = Record<string, string>,
> {
	/**
	 * Base colors to generate scales from.
	 * Keys are scale names, values are hex colors (step 9 / the primary solid color).
	 *
	 * @example
	 * ```typescript
	 * {
	 *   primary: '#0090ff',
	 *   secondary: '#8e4ec6',
	 *   success: '#30a46c',
	 *   danger: '#e5484d',
	 * }
	 * ```
	 */
	colors: TScales;

	/**
	 * Prefix for CSS variable names.
	 * @default 'color'
	 */
	prefix?: string;

	/**
	 * Name of the dark theme.
	 * @default 'dark'
	 */
	darkThemeName?: string;

	/**
	 * Override specific step values in light mode after generation.
	 */
	lightOverrides?: Partial<
		Record<keyof TScales, Partial<Record<ColorScaleStep, string>>>
	>;

	/**
	 * Override specific step values in dark mode after generation.
	 */
	darkOverrides?: Partial<
		Record<keyof TScales, Partial<Record<ColorScaleStep, string>>>
	>;
}

// Type utilities for generating result types
// Note: Capitalize<S> is a built-in TypeScript intrinsic type (TS 4.1+)

type GeneratedColorScaleResult<
	TPrefix extends string,
	TScales extends Record<string, string>,
> = {
	[K in keyof TScales as K extends string
		? `${TPrefix}${Capitalize<K>}${ColorScaleStep}`
		: never]: K extends string
		? Variable<`${TPrefix}.${K}.${ColorScaleStep}`>
		: never;
};

// =============================================================================
// Main Preset Function
// =============================================================================

function capitalize<T extends string>(str: T): Capitalize<T> {
	return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}

/**
 * Generate CSS variables for color scales derived from base colors.
 *
 * This preset uses an algorithm based on OKLCH color space to generate
 * 12-step color scales from single base colors. Each scale provides:
 * - Steps 1-2: App/subtle backgrounds
 * - Steps 3-5: Component backgrounds (normal, hover, active)
 * - Steps 6-8: Borders (subtle to strong)
 * - Step 9: Solid color (the base color)
 * - Step 10: Solid hover state
 * - Steps 11-12: Text colors (low and high contrast)
 *
 * @param s - The Styleframe instance
 * @param config - Configuration options
 * @returns An object containing all generated color variables
 *
 * @example Basic usage
 * ```typescript
 * const s = styleframe();
 *
 * const colors = useGeneratedColorScalePreset(s, {
 *   colors: {
 *     primary: '#0090ff',
 *     success: '#30a46c',
 *     danger: '#e5484d',
 *   },
 * });
 *
 * // Use the generated variables
 * s.selector('.button', {
 *   backgroundColor: s.ref(colors.colorPrimary9),
 *   color: s.ref(colors.colorPrimary12),
 *   '&:hover': {
 *     backgroundColor: s.ref(colors.colorPrimary10),
 *   },
 * });
 * ```
 *
 * @example With overrides
 * ```typescript
 * const colors = useGeneratedColorScalePreset(s, {
 *   colors: {
 *     brand: '#ff6b00',
 *   },
 *   lightOverrides: {
 *     brand: { 12: '#1a0800' }, // Custom dark text
 *   },
 *   darkOverrides: {
 *     brand: { 1: '#1a0800' }, // Custom dark background
 *   },
 * });
 * ```
 *
 * @example Custom prefix
 * ```typescript
 * const colors = useGeneratedColorScalePreset(s, {
 *   prefix: 'c',
 *   colors: { accent: '#8e4ec6' },
 * });
 *
 * // Variables: --c--accent--1, --c--accent--2, etc.
 * // Result keys: cAccent1, cAccent2, etc.
 * ```
 */
export function useGeneratedColorScalePreset<
	TPrefix extends string = "color",
	TScales extends Record<string, string> = Record<string, string>,
>(
	s: Styleframe,
	config: GeneratedColorScalePresetConfig<TScales> & { prefix?: TPrefix },
): GeneratedColorScaleResult<TPrefix, TScales> {
	const prefix = (config.prefix ?? "color") as TPrefix;
	const darkThemeName = config.darkThemeName ?? "dark";
	const colors = config.colors;
	const lightOverrides = config.lightOverrides ?? {};
	const darkOverrides = config.darkOverrides ?? {};

	const result: Record<string, Variable<string>> = {};

	// Generate light mode scales
	const lightScales: Record<string, Record<ColorScaleStep, string>> = {};
	const darkScales: Record<string, Record<ColorScaleStep, string>> = {};

	for (const [scaleName, baseColor] of Object.entries(colors)) {
		lightScales[scaleName] = generateColorScale(baseColor, "light");
		darkScales[scaleName] = generateColorScale(baseColor, "dark");
	}

	// Create light mode variables (on :root)
	for (const [scaleName, scale] of Object.entries(lightScales)) {
		const overrides =
			(
				lightOverrides as Record<
					string,
					Partial<Record<ColorScaleStep, string>>
				>
			)[scaleName] ?? {};

		for (const step of colorScaleSteps) {
			const variableName = `${prefix}.${scaleName}.${step}`;
			const colorValue = overrides[step] ?? scale[step]!;

			const variable = s.variable(variableName, colorValue, {
				default: true,
			});

			const exportKey = `${prefix}${capitalize(scaleName)}${step}`;
			result[exportKey] = variable;
		}
	}

	// Create dark mode theme with generated values
	s.theme(darkThemeName, (ctx) => {
		for (const [scaleName, scale] of Object.entries(darkScales)) {
			const overrides =
				(
					darkOverrides as Record<
						string,
						Partial<Record<ColorScaleStep, string>>
					>
				)[scaleName] ?? {};

			for (const step of colorScaleSteps) {
				const colorValue = overrides[step] ?? scale[step]!;

				const exportKey = `${prefix}${capitalize(scaleName)}${step}`;
				const variable = result[exportKey];
				if (variable) {
					ctx.variable(variable, colorValue);
				}
			}
		}
	});

	return result as GeneratedColorScaleResult<TPrefix, TScales>;
}
