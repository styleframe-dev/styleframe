import type { Styleframe, TokenValue, Variable } from "@styleframe/core";
import type { CamelCase } from "scule";
import { camelCase } from "scule";

/**
 * Transforms color keys to their export names
 *
 * @example
 * { "primary": "#007bff" } -> {
 * 		"colorPrimary": Variable<'color--primary'>,
 * }
 */
type ColorExportKeys<T extends Record<string, TokenValue>> = {
	[K in keyof T as CamelCase<`color--${string & K}`>]: Variable<`color--${string & K}`>;
};

/**
 * Create a set of color variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useColors } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   colorPrimary, // Variable<'color--primary'>
 *   colorSecondary, // Variable<'color--secondary'>
 * } = useColors(s, {
 *   primary: "#007bff",
 *   secondary: "#6c757d",
 * });
 * ```
 */
export function useColors<T extends Record<string, TokenValue>>(
	s: Styleframe,
	colors: T,
): ColorExportKeys<T> {
	const result: Record<string, Variable<string>> = {};

	for (const [key, value] of Object.entries(colors)) {
		const variableName = `color--${key}` as const;
		const exportName: CamelCase<typeof variableName> = camelCase(variableName);

		result[exportName] = s.variable(variableName, value);
	}

	return result as ColorExportKeys<T>;
}

/**
 * Transforms color keys to their lightness level export names
 *
 * @example <"color--primary", { 100: 10, 200: 20 }> -> {
 * 		colorPrimary100: Variable<'color--primary-100'>,
 * 		colorPrimary200: Variable<'color--primary-200'>
 * }
 */
type ColorLightnessLevelsExportKeys<
	Name extends string,
	T extends Record<string | number, TokenValue>,
> = {
	[K in keyof T as CamelCase<`${Name}-${(string | number) & K}`>]: Variable<`${Name}-${(string | number) & K}`>;
};

/**
 * Create a set of lightness levels for a color variable.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useColors } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const colorPrimary = s.variable("color--primary", "#007bff");
 *
 * const {
 *   colorPrimary100, // Variable<'color--primary-100'>
 *   colorPrimary200, // Variable<'color--primary-200'>
 *   colorPrimary300, // Variable<'color--primary-300'>
 *   ...
 * } = useColorLightnessLevels(s, colorPrimary, {
 *   100: 10,
 *   200: 20,
 *   300: 30,
 *   ...
 * });
 * ```
 */
export function useColorLightnessLevels<
	Name extends string,
	T extends Record<string | number, number>,
>(
	s: Styleframe,
	color: Variable<Name>,
	levels: T,
): ColorLightnessLevelsExportKeys<Name, T> {
	const result: Record<string, Variable<string>> = {};

	for (const [level, value] of Object.entries(levels)) {
		const variableName = `${color.name}-${level}` as const;
		const exportName = camelCase(variableName);

		result[exportName] = s.variable(
			variableName,
			s.css`oklch(from ${s.ref(color)} ${value / 100} c h / a)`,
		);
	}

	return result as ColorLightnessLevelsExportKeys<Name, T>;
}

/**
 * Transforms color keys into a set of relative color shade (darker) levels
 *
 * @example <"color--primary", { 50: 5, 100: 10, 200: 20 }> -> {
 * 		colorPrimaryShade50: Variable<'color--primary-shade-50'>,
 * 		colorPrimaryShade100: Variable<'color--primary-shade-100'>,
 * 		colorPrimaryShade200: Variable<'color--primary-shade-200'>
 * }
 */
type ColorShadeLevelsExportKeys<
	Name extends string,
	T extends Record<string | number, number>,
> = {
	[K in keyof T as CamelCase<`${Name}-shade-${(string | number) & K}`>]: Variable<`${Name}-shade-${(string | number) & K}`>;
};

/**
 * Create a set of relative color shade (darker) levels
 *
 * @usage
 * const s = styleframe();
 *
 * const colorPrimary = s.variable("color--primary", "#007bff");
 *
 * const {
 *   colorPrimaryShade50, // Variable<'color--primary-shade-50'>
 *   colorPrimaryShade100, // Variable<'color--primary-shade-100'>
 *   colorPrimaryShade150, // Variable<'color--primary-shade-150'>
 *   ...
 * } = useColorShadeLevels(s, colorPrimary, {
 *   50: 5,
 *   100: 10,
 *   150: 15,
 *   ...
 * });
 * ```
 */
export function useColorShadeLevels<
	Name extends string,
	T extends Record<string | number, number>,
>(
	s: Styleframe,
	color: Variable<Name>,
	levels: T,
): ColorShadeLevelsExportKeys<Name, T> {
	const result: Record<string, Variable<string>> = {};

	for (const [level, value] of Object.entries(levels)) {
		const variableName = `${color.name}-shade-${level}` as const;
		const exportName = camelCase(variableName);

		result[exportName] = s.variable(
			variableName,
			s.css`oklch(from ${s.ref(color)} calc(l - ${value / 100}) c h / a)`,
		);
	}

	return result as ColorShadeLevelsExportKeys<Name, T>;
}

/**
 * Transforms a color into a set of relative color tint (lighter) levels
 *
 * @example <"color--primary", { 50: 5, 100: 10, 200: 20 }> -> {
 * 		colorPrimaryTint50: Variable<'color--primary-tint-50'>,
 * 		colorPrimaryTint100: Variable<'color--primary-tint-100'>,
 * 		colorPrimaryTint200: Variable<'color--primary-tint-200'>
 * }
 */

type ColorTintLevelsExportKeys<
	Name extends string,
	T extends Record<string | number, number>,
> = {
	[K in keyof T as CamelCase<`${Name}-tint-${(string | number) & K}`>]: Variable<`${Name}-tint-${(string | number) & K}`>;
};

/**
 * Create a set of relative color tint (lighter) levels
 *
 * @usage
 * const s = styleframe();
 *
 * const colorPrimary = s.variable("color--primary", "#007bff");
 *
 * const {
 *   colorPrimaryTint50, // Variable<'color--primary-tint-50'>
 *   colorPrimaryTint100, // Variable<'color--primary-tint-100'>
 *   colorPrimaryTint150, // Variable<'color--primary-tint-150'>
 *   ...
 * } = useColorTintLevels(s, colorPrimary, {
 *   50: 5,
 *   100: 10,
 *   150: 15,
 *   ...
 * });
 * ```
 */
export function useColorTintLevels<
	Name extends string,
	T extends Record<string | number, number>,
>(
	s: Styleframe,
	color: Variable<Name>,
	levels: T,
): ColorTintLevelsExportKeys<Name, T> {
	const result: Record<string, Variable<string>> = {};

	for (const [level, value] of Object.entries(levels)) {
		const variableName = `${color.name}-tint-${level}` as const;
		const exportName = camelCase(variableName);

		result[exportName] = s.variable(
			variableName,
			s.css`oklch(from ${s.ref(color)} calc(l + ${value / 100}) c h / a)`,
		);
	}

	return result as ColorTintLevelsExportKeys<Name, T>;
}
