import { createUseSpacingUtility } from "../../utils";

/**
 * Create padding utility classes with multiplier support.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * const createPadding = usePaddingUtility(s, { sm: '0.5rem', md: '1rem', lg: '1.5rem' });
 *
 * // Add multiplier values (with @ prefix):
 * createPadding(["@1.5", "@2"]);
 * // Generates:
 * // ._padding:1.5 { padding: calc(var(--spacing) * 1.5); }
 * // ._padding:2 { padding: calc(var(--spacing) * 2); }
 * ```
 */
export const usePaddingUtility = createUseSpacingUtility(
	"padding",
	({ value }) => ({
		padding: value,
	}),
);

/**
 * Create horizontal padding utility classes (left and right).
 */
export const usePaddingInlineUtility = createUseSpacingUtility(
	"padding-inline",
	({ value }) => ({
		paddingLeft: value,
		paddingRight: value,
	}),
);

/**
 * Create vertical padding utility classes (top and bottom).
 */
export const usePaddingBlockUtility = createUseSpacingUtility(
	"padding-block",
	({ value }) => ({
		paddingTop: value,
		paddingBottom: value,
	}),
);

/**
 * Create padding-top utility classes.
 */
export const usePaddingTopUtility = createUseSpacingUtility(
	"padding-top",
	({ value }) => ({
		paddingTop: value,
	}),
);

/**
 * Create padding-right utility classes.
 */
export const usePaddingRightUtility = createUseSpacingUtility(
	"padding-right",
	({ value }) => ({
		paddingRight: value,
	}),
);

/**
 * Create padding-bottom utility classes.
 */
export const usePaddingBottomUtility = createUseSpacingUtility(
	"padding-bottom",
	({ value }) => ({
		paddingBottom: value,
	}),
);

/**
 * Create padding-left utility classes.
 */
export const usePaddingLeftUtility = createUseSpacingUtility(
	"padding-left",
	({ value }) => ({
		paddingLeft: value,
	}),
);

/**
 * Create padding-inline-start utility classes.
 */
export const usePaddingInlineStartUtility = createUseSpacingUtility(
	"padding-inline-start",
	({ value }) => ({
		paddingInlineStart: value,
	}),
);

/**
 * Create padding-inline-end utility classes.
 */
export const usePaddingInlineEndUtility = createUseSpacingUtility(
	"padding-inline-end",
	({ value }) => ({
		paddingInlineEnd: value,
	}),
);

/**
 * Create padding-x utility classes (left and right).
 */
export const usePaddingXUtility = createUseSpacingUtility(
	"padding-x",
	({ value }) => ({
		paddingLeft: value,
		paddingRight: value,
	}),
);

/**
 * Create padding-y utility classes (top and bottom).
 */
export const usePaddingYUtility = createUseSpacingUtility(
	"padding-y",
	({ value }) => ({
		paddingTop: value,
		paddingBottom: value,
	}),
);
