import { createUseUtility } from "../../utils";
import { animationValues } from "../../values";

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
	{ defaults: animationValues },
);
