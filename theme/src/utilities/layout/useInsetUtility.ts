import { createUseUtility } from "../../utils";

/**
 * Create inset utility classes (top, right, bottom, left).
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useInsetUtility(s, { '0': '0', '1': '0.25rem', auto: 'auto' });
 * ```
 */
export const useInsetUtility = createUseUtility("inset", ({ value }) => ({
	top: value,
	right: value,
	bottom: value,
	left: value,
}));

/**
 * Create inset-x utility classes (left and right).
 */
export const useInsetXUtility = createUseUtility("inset-x", ({ value }) => ({
	left: value,
	right: value,
}));

/**
 * Create inset-y utility classes (top and bottom).
 */
export const useInsetYUtility = createUseUtility("inset-y", ({ value }) => ({
	top: value,
	bottom: value,
}));

/**
 * Create inset-inline-start utility classes.
 */
export const useInsetStartUtility = createUseUtility(
	"inset-inline-start",
	({ value }) => ({
		insetInlineStart: value,
	}),
);

/**
 * Create inset-inline-end utility classes.
 */
export const useInsetEndUtility = createUseUtility(
	"inset-inline-end",
	({ value }) => ({
		insetInlineEnd: value,
	}),
);

/**
 * Create top utility classes.
 */
export const useTopUtility = createUseUtility("top", ({ value }) => ({
	top: value,
}));

/**
 * Create right utility classes.
 */
export const useRightUtility = createUseUtility("right", ({ value }) => ({
	right: value,
}));

/**
 * Create bottom utility classes.
 */
export const useBottomUtility = createUseUtility("bottom", ({ value }) => ({
	bottom: value,
}));

/**
 * Create left utility classes.
 */
export const useLeftUtility = createUseUtility("left", ({ value }) => ({
	left: value,
}));
