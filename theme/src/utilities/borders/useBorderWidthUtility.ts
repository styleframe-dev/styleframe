import { createUseUtility } from "../../utils";

/**
 * Create border-width utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useBorderWidthUtility(s, {
 *     '0': '0px',
 *     '2': '2px',
 *     '4': '4px',
 *     '8': '8px',
 *     default: '1px',
 * });
 * ```
 */
export const useBorderWidthUtility = createUseUtility(
	"border-width",
	({ value }) => ({
		borderWidth: value,
	}),
);

/**
 * Create border-x-width utility classes.
 */
export const useBorderWidthXUtility = createUseUtility(
	"border-x-width",
	({ value }) => ({
		borderLeftWidth: value,
		borderRightWidth: value,
	}),
);

/**
 * Create border-y-width utility classes.
 */
export const useBorderWidthYUtility = createUseUtility(
	"border-y-width",
	({ value }) => ({
		borderTopWidth: value,
		borderBottomWidth: value,
	}),
);

/**
 * Create border-top-width utility classes.
 */
export const useBorderWidthTopUtility = createUseUtility(
	"border-top-width",
	({ value }) => ({
		borderTopWidth: value,
	}),
);

/**
 * Create border-right-width utility classes.
 */
export const useBorderWidthRightUtility = createUseUtility(
	"border-right-width",
	({ value }) => ({
		borderRightWidth: value,
	}),
);

/**
 * Create border-bottom-width utility classes.
 */
export const useBorderWidthBottomUtility = createUseUtility(
	"border-bottom-width",
	({ value }) => ({
		borderBottomWidth: value,
	}),
);

/**
 * Create border-left-width utility classes.
 */
export const useBorderWidthLeftUtility = createUseUtility(
	"border-left-width",
	({ value }) => ({
		borderLeftWidth: value,
	}),
);

/**
 * Create border-inline-start-width utility classes.
 */
export const useBorderWidthStartUtility = createUseUtility(
	"border-inline-start-width",
	({ value }) => ({
		borderInlineStartWidth: value,
	}),
);

/**
 * Create border-inline-end-width utility classes.
 */
export const useBorderWidthEndUtility = createUseUtility(
	"border-inline-end-width",
	({ value }) => ({
		borderInlineEndWidth: value,
	}),
);
