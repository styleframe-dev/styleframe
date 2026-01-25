import { createUseUtility } from "../../utils";
import { overflowValues } from "../../values";

/**
 * Create overflow utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useOverflowUtility(s);
 * // Uses defaults: ._overflow:auto, ._overflow:hidden, etc.
 * ```
 */
export const useOverflowUtility = createUseUtility(
	"overflow",
	({ value }) => ({
		overflow: value,
	}),
	{ defaults: overflowValues },
);

/**
 * Create overflow-x utility classes.
 */
export const useOverflowXUtility = createUseUtility(
	"overflow-x",
	({ value }) => ({
		overflowX: value,
	}),
	{ defaults: overflowValues },
);

/**
 * Create overflow-y utility classes.
 */
export const useOverflowYUtility = createUseUtility(
	"overflow-y",
	({ value }) => ({
		overflowY: value,
	}),
	{ defaults: overflowValues },
);
