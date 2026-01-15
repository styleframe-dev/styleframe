import { createUseUtility } from "../../utils";

/**
 * Default overflow utility values matching Tailwind CSS.
 */
export const defaultOverflowValues = {
	auto: "auto",
	hidden: "hidden",
	clip: "clip",
	visible: "visible",
	scroll: "scroll",
};

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
	{ defaults: defaultOverflowValues },
);

/**
 * Create overflow-x utility classes.
 */
export const useOverflowXUtility = createUseUtility(
	"overflow-x",
	({ value }) => ({
		overflowX: value,
	}),
	{ defaults: defaultOverflowValues },
);

/**
 * Create overflow-y utility classes.
 */
export const useOverflowYUtility = createUseUtility(
	"overflow-y",
	({ value }) => ({
		overflowY: value,
	}),
	{ defaults: defaultOverflowValues },
);
