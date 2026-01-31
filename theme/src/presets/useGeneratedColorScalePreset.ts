import type { Styleframe, Variable } from "@styleframe/core";

// =============================================================================
// Color Conversion Utilities
// =============================================================================

interface RGB {
	r: number;
	g: number;
	b: number;
}

interface XYZ {
	x: number;
	y: number;
	z: number;
}

interface OKLab {
	L: number;
	a: number;
	b: number;
}

interface OKLCH {
	l: number;
	c: number;
	h: number;
}

function hexToRgb(hex: string): RGB | null {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) return null;
	return {
		r: parseInt(result[1]!, 16) / 255,
		g: parseInt(result[2]!, 16) / 255,
		b: parseInt(result[3]!, 16) / 255,
	};
}

function srgbToLinear(c: number): number {
	return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
	return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

function rgbToXyz({ r, g, b }: RGB): XYZ {
	const lr = srgbToLinear(r);
	const lg = srgbToLinear(g);
	const lb = srgbToLinear(b);
	return {
		x: 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb,
		y: 0.2126729 * lr + 0.7151522 * lg + 0.072175 * lb,
		z: 0.0193339 * lr + 0.119192 * lg + 0.9503041 * lb,
	};
}

function xyzToRgb({ x, y, z }: XYZ): RGB {
	const lr = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
	const lg = -0.969266 * x + 1.8760108 * y + 0.041556 * z;
	const lb = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
	return {
		r: linearToSrgb(lr),
		g: linearToSrgb(lg),
		b: linearToSrgb(lb),
	};
}

function xyzToOklab({ x, y, z }: XYZ): OKLab {
	const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
	const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
	const s_ = Math.cbrt(-0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z);
	return {
		L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
		a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
		b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
	};
}

function oklabToXyz({ L, a, b }: OKLab): XYZ {
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.291485548 * b;
	return {
		x:
			1.2270138511 * l_ * l_ * l_ -
			0.5577999807 * m_ * m_ * m_ +
			0.281256149 * s_ * s_ * s_,
		y:
			-0.0405801784 * l_ * l_ * l_ +
			1.1122568696 * m_ * m_ * m_ -
			0.0716766787 * s_ * s_ * s_,
		z:
			-0.0763812845 * l_ * l_ * l_ -
			0.4214819784 * m_ * m_ * m_ +
			1.5861632204 * s_ * s_ * s_,
	};
}

function oklchToOklab({ l, c, h }: OKLCH): OKLab {
	return {
		L: l,
		a: c * Math.cos((h * Math.PI) / 180),
		b: c * Math.sin((h * Math.PI) / 180),
	};
}

function oklabToOklch({ L, a, b }: OKLab): OKLCH {
	return {
		l: L,
		c: Math.sqrt(a * a + b * b),
		h: ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360,
	};
}

function hexToOklch(hex: string): OKLCH {
	const rgb = hexToRgb(hex);
	if (!rgb) {
		throw new Error(`Invalid hex color: ${hex}`);
	}
	return oklabToOklch(xyzToOklab(rgbToXyz(rgb)));
}

function isInGamut({ r, g, b }: RGB): boolean {
	const epsilon = 0.001;
	return (
		r >= -epsilon &&
		r <= 1 + epsilon &&
		g >= -epsilon &&
		g <= 1 + epsilon &&
		b >= -epsilon &&
		b <= 1 + epsilon
	);
}

function gamutMapOklch({ l, c, h }: OKLCH): OKLCH {
	let currentC = c;
	for (let i = 0; i < 50 && currentC > 0.001; i++) {
		const rgb = xyzToRgb(oklabToXyz(oklchToOklab({ l, c: currentC, h })));
		if (isInGamut(rgb)) {
			return { l, c: currentC, h };
		}
		currentC *= 0.95;
	}
	return { l, c: 0, h };
}

function oklchToHex({ l, c, h }: OKLCH): string {
	const rgb = xyzToRgb(oklabToXyz(oklchToOklab({ l, c, h })));
	const clamp = (v: number) => Math.max(0, Math.min(1, v));
	const r = Math.round(clamp(rgb.r) * 255);
	const g = Math.round(clamp(rgb.g) * 255);
	const b = Math.round(clamp(rgb.b) * 255);
	return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
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
	0.756, // step 8: strong borders
	1.0, // step 9: solid backgrounds (base)
	1.078, // step 10: hovered solid
	1.27, // step 11: low contrast text
	1.94, // step 12: high contrast text
] as const;

/**
 * Lightness curve coefficients for dark mode.
 * Each value represents the fraction of distance from black (0.17) to the base lightness.
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
	1.25, // step 11: low contrast text
	1.56, // step 12: high contrast text
] as const;

/**
 * Chroma curve coefficients for light mode.
 * Each value is a multiplier of the base chroma.
 */
const LIGHT_CHROMA_CURVE = [
	0.12, // step 1
	0.12, // step 2
	0.14, // step 3
	0.2, // step 4
	0.28, // step 5
	0.38, // step 6
	0.5, // step 7
	0.7, // step 8
	1.0, // step 9: full chroma
	0.93, // step 10
	0.84, // step 11
	0.5, // step 12
] as const;

/**
 * Chroma curve coefficients for dark mode.
 * Each value is a multiplier of the base chroma.
 */
const DARK_CHROMA_CURVE = [
	0.12, // step 1
	0.15, // step 2
	0.34, // step 3
	0.5, // step 4
	0.55, // step 5
	0.6, // step 6
	0.66, // step 7
	0.76, // step 8
	1.0, // step 9: full chroma
	0.87, // step 10
	0.63, // step 11
	0.24, // step 12
] as const;

/**
 * Edge lightness values for light and dark modes.
 */
const LIGHT_EDGE = 0.995;
const DARK_EDGE = 0.17;

export type ColorScaleStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const colorScaleSteps: readonly ColorScaleStep[] = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
] as const;

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
		const targetL = Math.max(
			0.05,
			Math.min(0.98, lightEdge + lightnessCurve[i - 1]! * range),
		);
		const targetC = base.c * chromaCurve[i - 1]!;

		const mapped = gamutMapOklch({ l: targetL, c: targetC, h: base.h });
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
	return { lightness: l, chroma: c, hue: h };
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
type Capitalize<S extends string> = S extends `${infer F}${infer R}`
	? `${Uppercase<F>}${R}`
	: S;

type ColorScaleVariables<TPrefix extends string, TScale extends string> = {
	[K in ColorScaleStep as `${TPrefix}${Capitalize<TScale>}${K}`]: Variable<`${TPrefix}.${TScale}.${K}`>;
};

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
