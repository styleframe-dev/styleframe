import { createUseVariable } from "../utils";
import { defaultEasingValues } from "../values";

export { defaultEasingValues };

/**
 * Create a set of easing variables for use in a Styleframe instance.
 *
 * Includes CSS keywords, cubic-bezier curves from easings.net, and
 * linear() functions for spring and bounce animations.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useEasing } from "@styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   easing, // Variable<'easing'>
 *   easingEaseInOut, // Variable<'easing.ease-in-out'>
 *   easingEaseOutCubic, // Variable<'easing.ease-out-cubic'>
 *   easingSpring, // Variable<'easing.spring'>
 *   easingBounce, // Variable<'easing.bounce'>
 * } = useEasing(s, {
 *   default: "ease-in-out",
 *   "ease-in-out": "ease-in-out",
 *   "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
 *   spring: "linear(...)",
 *   bounce: "linear(...)",
 * });
 * ```
 */
export const useEasing = createUseVariable("easing", {
	defaults: defaultEasingValues,
});
