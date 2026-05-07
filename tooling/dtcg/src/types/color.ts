/**
 * DTCG color types.
 * @see Design Tokens Color Module 2025.10
 */

/**
 * The 14 color spaces defined in the Color Module.
 */
export type DTCGColorSpace =
	| "srgb"
	| "srgb-linear"
	| "hsl"
	| "hwb"
	| "lab"
	| "lch"
	| "oklab"
	| "oklch"
	| "display-p3"
	| "a98-rgb"
	| "prophoto-rgb"
	| "rec2020"
	| "xyz-d50"
	| "xyz-d65";

/**
 * A single component value. The literal `"none"` keyword is used to
 * disambiguate "missing" from "zero" (e.g. HSL hue with no defined value).
 */
export type DTCGColorComponent = number | "none";

/**
 * Component arrays are always 3 entries — the spec defines no 4-component
 * spaces (alpha is a separate field).
 */
export type DTCGColorComponents = readonly [
	DTCGColorComponent,
	DTCGColorComponent,
	DTCGColorComponent,
];

/**
 * Canonical DTCG color value shape (Color Module §3).
 */
export interface DTCGColor {
	colorSpace: DTCGColorSpace;
	components: DTCGColorComponents;
	/** 0–1, defaults to 1 when omitted */
	alpha?: number;
	/** Optional fallback hex string (#rrggbb or #rrggbbaa). */
	hex?: string;
}
