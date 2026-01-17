import { createUseUtility } from "../../utils";

/**
 * Create padding utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * usePaddingUtility(s, { sm: '0.5rem', md: '1rem', lg: '1.5rem' });
 * // Generates: ._padding:sm, ._padding:md, ._padding:lg
 * ```
 */
export const usePaddingUtility = createUseUtility("padding", ({ value }) => ({
	padding: value,
}));

/**
 * Create horizontal padding utility classes (left and right).
 */
export const usePaddingInlineUtility = createUseUtility(
	"padding-inline",
	({ value }) => ({
		paddingLeft: value,
		paddingRight: value,
	}),
);

/**
 * Create vertical padding utility classes (top and bottom).
 */
export const usePaddingBlockUtility = createUseUtility(
	"padding-block",
	({ value }) => ({
		paddingTop: value,
		paddingBottom: value,
	}),
);

/**
 * Create padding-top utility classes.
 */
export const usePaddingTopUtility = createUseUtility(
	"padding-top",
	({ value }) => ({
		paddingTop: value,
	}),
);

/**
 * Create padding-right utility classes.
 */
export const usePaddingRightUtility = createUseUtility(
	"padding-right",
	({ value }) => ({
		paddingRight: value,
	}),
);

/**
 * Create padding-bottom utility classes.
 */
export const usePaddingBottomUtility = createUseUtility(
	"padding-bottom",
	({ value }) => ({
		paddingBottom: value,
	}),
);

/**
 * Create padding-left utility classes.
 */
export const usePaddingLeftUtility = createUseUtility(
	"padding-left",
	({ value }) => ({
		paddingLeft: value,
	}),
);

/**
 * Create padding-inline-start utility classes.
 */
export const usePaddingInlineStartUtility = createUseUtility(
	"padding-inline-start",
	({ value }) => ({
		paddingInlineStart: value,
	}),
);

/**
 * Create padding-inline-end utility classes.
 */
export const usePaddingInlineEndUtility = createUseUtility(
	"padding-inline-end",
	({ value }) => ({
		paddingInlineEnd: value,
	}),
);

/**
 * Create padding-x utility classes (left and right).
 */
export const usePaddingXUtility = createUseUtility(
	"padding-x",
	({ value }) => ({
		paddingLeft: value,
		paddingRight: value,
	}),
);

/**
 * Create padding-y utility classes (top and bottom).
 */
export const usePaddingYUtility = createUseUtility(
	"padding-y",
	({ value }) => ({
		paddingTop: value,
		paddingBottom: value,
	}),
);
