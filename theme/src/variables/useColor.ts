import type { Styleframe, TokenValue, Variable } from "@styleframe/core";
import { oklch } from "culori";
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
export function useColor<T extends Record<string, TokenValue>>(
	s: Styleframe,
	colors: T,
): ColorExportKeys<T> {
	const result: Record<string, Variable<string>> = {};

	for (const [key, value] of Object.entries(colors)) {
		const variableName = `color--${key}` as const;
		const exportName: CamelCase<typeof variableName> = camelCase(variableName);

		let parsedValue = value;
		if (typeof value === "string") {
			const { l, c, h, alpha = 1 } = oklch(value);
			parsedValue = `oklch(${l} ${c} ${h} / ${alpha})`;
		}

		result[exportName] = s.variable(variableName, parsedValue, {
			default: true,
		});
	}

	return result as ColorExportKeys<T>;
}
