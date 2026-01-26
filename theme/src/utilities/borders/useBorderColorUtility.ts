import { createUseUtility } from "../../utils";

/**
 * Create border-color utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useBorderColorUtility(s, {
 *     inherit: 'inherit',
 *     current: 'currentColor',
 *     transparent: 'transparent',
 *     black: '#000',
 *     white: '#fff',
 * });
 * ```
 */
export const useBorderColorUtility = createUseUtility(
	"border-color",
	({ value }) => ({
		borderColor: value,
	}),
);

/**
 * Create border-x-color utility classes.
 */
export const useBorderColorXUtility = createUseUtility(
	"border-x-color",
	({ value }) => ({
		borderLeftColor: value,
		borderRightColor: value,
	}),
);

/**
 * Create border-y-color utility classes.
 */
export const useBorderColorYUtility = createUseUtility(
	"border-y-color",
	({ value }) => ({
		borderTopColor: value,
		borderBottomColor: value,
	}),
);

/**
 * Create border-top-color utility classes.
 */
export const useBorderColorTopUtility = createUseUtility(
	"border-top-color",
	({ value }) => ({
		borderTopColor: value,
	}),
);

/**
 * Create border-right-color utility classes.
 */
export const useBorderColorRightUtility = createUseUtility(
	"border-right-color",
	({ value }) => ({
		borderRightColor: value,
	}),
);

/**
 * Create border-bottom-color utility classes.
 */
export const useBorderColorBottomUtility = createUseUtility(
	"border-bottom-color",
	({ value }) => ({
		borderBottomColor: value,
	}),
);

/**
 * Create border-left-color utility classes.
 */
export const useBorderColorLeftUtility = createUseUtility(
	"border-left-color",
	({ value }) => ({
		borderLeftColor: value,
	}),
);

/**
 * Create border-inline-start-color utility classes.
 */
export const useBorderColorStartUtility = createUseUtility(
	"border-inline-start-color",
	({ value }) => ({
		borderInlineStartColor: value,
	}),
);

/**
 * Create border-inline-end-color utility classes.
 */
export const useBorderColorEndUtility = createUseUtility(
	"border-inline-end-color",
	({ value }) => ({
		borderInlineEndColor: value,
	}),
);
