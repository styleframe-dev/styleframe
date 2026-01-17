import { createUseUtility } from "../../utils";

/**
 * Create margin utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useMarginUtility(s, { sm: '0.5rem', md: '1rem', lg: '1.5rem', auto: 'auto' });
 * // Generates: ._margin:sm, ._margin:md, ._margin:lg, ._margin:auto
 * ```
 */
export const useMarginUtility = createUseUtility("margin", ({ value }) => ({
	margin: value,
}));

/**
 * Create horizontal margin utility classes (left and right).
 */
export const useMarginInlineUtility = createUseUtility(
	"margin-inline",
	({ value }) => ({
		marginLeft: value,
		marginRight: value,
	}),
);

/**
 * Create vertical margin utility classes (top and bottom).
 */
export const useMarginBlockUtility = createUseUtility(
	"margin-block",
	({ value }) => ({
		marginTop: value,
		marginBottom: value,
	}),
);

/**
 * Create margin-top utility classes.
 */
export const useMarginTopUtility = createUseUtility(
	"margin-top",
	({ value }) => ({
		marginTop: value,
	}),
);

/**
 * Create margin-right utility classes.
 */
export const useMarginRightUtility = createUseUtility(
	"margin-right",
	({ value }) => ({
		marginRight: value,
	}),
);

/**
 * Create margin-bottom utility classes.
 */
export const useMarginBottomUtility = createUseUtility(
	"margin-bottom",
	({ value }) => ({
		marginBottom: value,
	}),
);

/**
 * Create margin-left utility classes.
 */
export const useMarginLeftUtility = createUseUtility(
	"margin-left",
	({ value }) => ({
		marginLeft: value,
	}),
);

/**
 * Create margin-inline-start utility classes.
 */
export const useMarginInlineStartUtility = createUseUtility(
	"margin-inline-start",
	({ value }) => ({
		marginInlineStart: value,
	}),
);

/**
 * Create margin-inline-end utility classes.
 */
export const useMarginInlineEndUtility = createUseUtility(
	"margin-inline-end",
	({ value }) => ({
		marginInlineEnd: value,
	}),
);

/**
 * Create margin-x utility classes (left and right).
 */
export const useMarginXUtility = createUseUtility("margin-x", ({ value }) => ({
	marginLeft: value,
	marginRight: value,
}));

/**
 * Create margin-y utility classes (top and bottom).
 */
export const useMarginYUtility = createUseUtility("margin-y", ({ value }) => ({
	marginTop: value,
	marginBottom: value,
}));
