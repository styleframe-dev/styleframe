import type { Styleframe, TokenValue, Variable } from "@styleframe/core";
import { oklch } from "culori";
import type { CamelCase } from "scule";
import { camelCase } from "scule";
import type { ExportKeys } from "../types";
import { createUseVariable } from "../utils";

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

export const useColor = createUseVariable("color", (value) => {
	let transformedValue = value;

	if (typeof value === "string") {
		const { l, c, h, alpha = 1 } = oklch(value);
		transformedValue = `oklch(${l} ${c} ${h} / ${alpha})`;
	}

	return transformedValue;
});
