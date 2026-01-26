import { createUseUtility } from "../../utils";
import { positionValues } from "../../values";

/**
 * Create position utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * usePositionUtility(s);
 * // Uses defaults: ._position:static, ._position:fixed, etc.
 * ```
 */
export const usePositionUtility = createUseUtility(
	"position",
	({ value }) => ({
		position: value,
	}),
	{ defaults: positionValues },
);
