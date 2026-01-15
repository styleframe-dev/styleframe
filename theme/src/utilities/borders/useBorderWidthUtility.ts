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
	"border",
	({ value }) => ({
		borderWidth: value,
	}),
);

/**
 * Create border-x-width utility classes.
 */
export const useBorderWidthXUtility = createUseUtility(
	"border-x",
	({ value }) => ({
		borderLeftWidth: value,
		borderRightWidth: value,
	}),
);

/**
 * Create border-y-width utility classes.
 */
export const useBorderWidthYUtility = createUseUtility(
	"border-y",
	({ value }) => ({
		borderTopWidth: value,
		borderBottomWidth: value,
	}),
);

/**
 * Create border-top-width utility classes.
 */
export const useBorderWidthTopUtility = createUseUtility(
	"border-t",
	({ value }) => ({
		borderTopWidth: value,
	}),
);

/**
 * Create border-right-width utility classes.
 */
export const useBorderWidthRightUtility = createUseUtility(
	"border-r",
	({ value }) => ({
		borderRightWidth: value,
	}),
);

/**
 * Create border-bottom-width utility classes.
 */
export const useBorderWidthBottomUtility = createUseUtility(
	"border-b",
	({ value }) => ({
		borderBottomWidth: value,
	}),
);

/**
 * Create border-left-width utility classes.
 */
export const useBorderWidthLeftUtility = createUseUtility(
	"border-l",
	({ value }) => ({
		borderLeftWidth: value,
	}),
);

/**
 * Create border-inline-start-width utility classes.
 */
export const useBorderWidthStartUtility = createUseUtility(
	"border-s",
	({ value }) => ({
		borderInlineStartWidth: value,
	}),
);

/**
 * Create border-inline-end-width utility classes.
 */
export const useBorderWidthEndUtility = createUseUtility(
	"border-e",
	({ value }) => ({
		borderInlineEndWidth: value,
	}),
);
