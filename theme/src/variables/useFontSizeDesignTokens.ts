import { createUseVariable } from "../utils";
import { fontSizeStaticValues } from "../values";

/**
 * Create a set of font-size variables for use in a Styleframe instance.
 *
 * Each value can be a fixed `TokenValue` (e.g., `'1rem'`, a `Variable`, or an
 * `@`-reference) or a fluid range (`[min, max]` tuple or `{ min, max }` object
 * of absolute pixel values). Range values are passed through `useFluidClamp`
 * to produce viewport-interpolated CSS expressions, requiring
 * `useFluidViewportDesignTokens` to be active for the default `fluid.breakpoint`.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import {
 *   useFluidViewportDesignTokens,
 *   useFontSizeDesignTokens,
 * } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * useFluidViewportDesignTokens(s);
 *
 * const {
 *   fontSize, // Variable<'font-size'>
 *   fontSizeSm, // Variable<'font-size.sm'>
 *   fontSizeMd, // Variable<'font-size.md'>
 *   fontSizeLg, // Variable<'font-size.lg'>
 * } = useFontSizeDesignTokens(s, {
 *   default: "@font-size.md",
 *   sm: "0.875rem",         // fixed
 *   md: [16, 18],           // fluid: clamp 16px → 18px across viewport
 *   lg: { min: 18, max: 24 }, // fluid (object form)
 * });
 * ```
 */
export const useFontSizeDesignTokens = createUseVariable("font-size", {
	defaults: fontSizeStaticValues,
	fluid: true,
});
