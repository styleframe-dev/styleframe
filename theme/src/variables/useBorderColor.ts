import { createUseVariable } from "../utils";

/**
 * Create a set of border-color variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useBorderColor, useColor } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const { colorPrimary, colorSecondary } = useColor(s, {
 * 	 primary: "#007bff",
 *   secondary: "#6c757d",
 * });
 *
 * const {
 *   borderColorPrimary, // Variable<'border-color--primary'>
 *   borderColorSecondary, // Variable<'border-color--secondary'>
 * } = useBorderColor(s, {
 * 	 primary: ref(colorPrimary),
 *   secondary: ref(colorSecondary),
 * });
 * ```
 */
export const useBorderColor = createUseVariable("border-color");
