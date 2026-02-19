import { createUseSpacingUtility } from "../../utils";

/**
 * Create margin utility classes with multiplier support.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * const createMargin = useMarginUtility(s, { sm: '0.5rem', md: '1rem', lg: '1.5rem', auto: 'auto' });
 *
 * // Add multiplier values (with @ prefix):
 * createMargin(["@1.5", "@2", "@-1"]);
 * // Generates:
 * // ._margin:1.5 { margin: calc(var(--spacing) * 1.5); }
 * // ._margin:2 { margin: calc(var(--spacing) * 2); }
 * // ._margin:-1 { margin: calc(var(--spacing) * -1); }
 * ```
 */
export const useMarginUtility = createUseSpacingUtility(
	"margin",
	({ value }) => ({
		margin: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create horizontal margin utility classes (left and right).
 */
export const useMarginInlineUtility = createUseSpacingUtility(
	"margin-inline",
	({ value }) => ({
		marginLeft: value,
		marginRight: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create vertical margin utility classes (top and bottom).
 */
export const useMarginBlockUtility = createUseSpacingUtility(
	"margin-block",
	({ value }) => ({
		marginTop: value,
		marginBottom: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create margin-top utility classes.
 */
export const useMarginTopUtility = createUseSpacingUtility(
	"margin-top",
	({ value }) => ({
		marginTop: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create margin-right utility classes.
 */
export const useMarginRightUtility = createUseSpacingUtility(
	"margin-right",
	({ value }) => ({
		marginRight: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create margin-bottom utility classes.
 */
export const useMarginBottomUtility = createUseSpacingUtility(
	"margin-bottom",
	({ value }) => ({
		marginBottom: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create margin-left utility classes.
 */
export const useMarginLeftUtility = createUseSpacingUtility(
	"margin-left",
	({ value }) => ({
		marginLeft: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create margin-inline-start utility classes.
 */
export const useMarginInlineStartUtility = createUseSpacingUtility(
	"margin-inline-start",
	({ value }) => ({
		marginInlineStart: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create margin-inline-end utility classes.
 */
export const useMarginInlineEndUtility = createUseSpacingUtility(
	"margin-inline-end",
	({ value }) => ({
		marginInlineEnd: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create margin-x utility classes (left and right).
 */
export const useMarginXUtility = createUseSpacingUtility(
	"margin-x",
	({ value }) => ({
		marginLeft: value,
		marginRight: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create margin-y utility classes (top and bottom).
 */
export const useMarginYUtility = createUseSpacingUtility(
	"margin-y",
	({ value }) => ({
		marginTop: value,
		marginBottom: value,
	}),
	{ namespace: "spacing" },
);
