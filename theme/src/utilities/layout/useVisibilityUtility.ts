import { createUseUtility } from "../../utils";
import { visibilityValues } from "../../values";

/**
 * Create visibility utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useVisibilityUtility(s);
 * // Uses defaults: ._visibility:visible, ._visibility:invisible, ._visibility:collapse
 * ```
 */
export const useVisibilityUtility = createUseUtility(
	"visibility",
	({ value }) => ({
		visibility: value,
	}),
	{ defaults: visibilityValues },
);
