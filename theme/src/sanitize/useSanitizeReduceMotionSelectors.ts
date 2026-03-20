import type { Styleframe } from "@styleframe/core";

/**
 * Applies sanitize.css reduced motion rules.
 *
 * Implements https://github.com/csstools/sanitize.css/blob/main/reduce-motion.css
 * Disables animations and transitions when the user prefers reduced motion.
 *
 * @param s - The Styleframe instance to register selectors with
 */
export function useSanitizeReduceMotionSelectors(s: Styleframe): void {
	s.media("(prefers-reduced-motion: reduce)", ({ selector }) => {
		selector("*, ::before, ::after", {
			animationDelay: "-1ms !important",
			animationDuration: "1ms !important",
			animationIterationCount: "1 !important",
			backgroundAttachment: "initial !important",
			scrollBehavior: "auto !important",
			transitionDelay: "0s !important",
			transitionDuration: "0s !important",
		});
	});
}
