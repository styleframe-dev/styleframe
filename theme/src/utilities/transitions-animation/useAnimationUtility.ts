import { createUseUtility } from "../../utils";

/**
 * Default animation utility values matching Tailwind CSS.
 */
export const defaultAnimationValues = {
	none: "none",
	spin: "spin 1s linear infinite",
	ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
	pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
	bounce: "bounce 1s infinite",
};

/**
 * Create animation utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useAnimationUtility(s);
 * // Uses defaults: ._animate:none, ._animate:spin, etc.
 * ```
 */
export const useAnimationUtility = createUseUtility(
	"animate",
	({ value }) => ({
		animation: value,
	}),
	{ defaults: defaultAnimationValues },
);
