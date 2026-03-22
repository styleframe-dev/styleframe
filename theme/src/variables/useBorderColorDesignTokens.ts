import { createUseVariable } from "../utils";

/**
 * Create a set of border-color variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useBorderColorDesignTokens, useColorDesignTokens } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const { colorPrimary, colorSecondary } = useColorDesignTokens(s, {
 * 	 primary: "#007bff",
 *   secondary: "#6c757d",
 * });
 *
 * const {
 *   borderColorPrimary, // Variable<'border-color.primary'>
 *   borderColorSecondary, // Variable<'border-color.secondary'>
 * } = useBorderColorDesignTokens(s, {
 * 	 primary: ref(colorPrimary),
 *   secondary: ref(colorSecondary),
 * });
 * ```
 */
export const useBorderColorDesignTokens = createUseVariable("border-color");
