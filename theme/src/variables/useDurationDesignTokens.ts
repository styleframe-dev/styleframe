import { createUseVariable } from "../utils";
import { durationValues } from "../values";
/**
 * Create a set of duration variables for use in a Styleframe instance.
 *
 * Provides a semantic scale of animation/transition timing values
 * from instant (0ms) through slowest (1000ms).
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useDurationDesignTokens } from "@styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   duration, // Variable<'duration'>
 *   durationFast, // Variable<'duration.fast'>
 *   durationNormal, // Variable<'duration.normal'>
 *   durationSlow, // Variable<'duration.slow'>
 * } = useDurationDesignTokens(s, {
 *   default: "250ms",
 *   fast: "150ms",
 *   normal: "250ms",
 *   slow: "300ms",
 * });
 * ```
 */
export const useDurationDesignTokens = createUseVariable("duration", {
	defaults: durationValues,
});
