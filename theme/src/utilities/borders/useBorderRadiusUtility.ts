import { createUseUtility } from "../../utils";

/**
 * Create border-radius utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useBorderRadiusUtility(s, {
 *     none: '0px',
 *     sm: '0.125rem',
 *     default: '0.25rem',
 *     md: '0.375rem',
 *     lg: '0.5rem',
 *     full: '9999px',
 * });
 * ```
 */
export const useBorderRadiusUtility = createUseUtility(
	"border-radius",
	({ value }) => ({
		borderRadius: value,
	}),
);

/**
 * Create border-radius-top utility classes.
 */
export const useBorderRadiusTopUtility = createUseUtility(
	"border-radius-top",
	({ value }) => ({
		borderTopLeftRadius: value,
		borderTopRightRadius: value,
	}),
);

/**
 * Create border-radius-right utility classes.
 */
export const useBorderRadiusRightUtility = createUseUtility(
	"border-radius-right",
	({ value }) => ({
		borderTopRightRadius: value,
		borderBottomRightRadius: value,
	}),
);

/**
 * Create border-radius-bottom utility classes.
 */
export const useBorderRadiusBottomUtility = createUseUtility(
	"border-radius-bottom",
	({ value }) => ({
		borderBottomLeftRadius: value,
		borderBottomRightRadius: value,
	}),
);

/**
 * Create border-radius-left utility classes.
 */
export const useBorderRadiusLeftUtility = createUseUtility(
	"border-radius-left",
	({ value }) => ({
		borderTopLeftRadius: value,
		borderBottomLeftRadius: value,
	}),
);

/**
 * Create border-radius-start utility classes (logical property).
 */
export const useBorderRadiusStartUtility = createUseUtility(
	"border-radius-start",
	({ value }) => ({
		borderStartStartRadius: value,
		borderEndStartRadius: value,
	}),
);

/**
 * Create border-radius-end utility classes (logical property).
 */
export const useBorderRadiusEndUtility = createUseUtility(
	"border-radius-end",
	({ value }) => ({
		borderStartEndRadius: value,
		borderEndEndRadius: value,
	}),
);

/**
 * Create border-top-left-radius utility classes.
 */
export const useBorderRadiusTopLeftUtility = createUseUtility(
	"border-top-left-radius",
	({ value }) => ({
		borderTopLeftRadius: value,
	}),
);

/**
 * Create border-top-right-radius utility classes.
 */
export const useBorderRadiusTopRightUtility = createUseUtility(
	"border-top-right-radius",
	({ value }) => ({
		borderTopRightRadius: value,
	}),
);

/**
 * Create border-bottom-right-radius utility classes.
 */
export const useBorderRadiusBottomRightUtility = createUseUtility(
	"border-bottom-right-radius",
	({ value }) => ({
		borderBottomRightRadius: value,
	}),
);

/**
 * Create border-bottom-left-radius utility classes.
 */
export const useBorderRadiusBottomLeftUtility = createUseUtility(
	"border-bottom-left-radius",
	({ value }) => ({
		borderBottomLeftRadius: value,
	}),
);

/**
 * Create border-start-start-radius utility classes.
 */
export const useBorderRadiusStartStartUtility = createUseUtility(
	"border-start-start-radius",
	({ value }) => ({
		borderStartStartRadius: value,
	}),
);

/**
 * Create border-start-end-radius utility classes.
 */
export const useBorderRadiusStartEndUtility = createUseUtility(
	"border-start-end-radius",
	({ value }) => ({
		borderStartEndRadius: value,
	}),
);

/**
 * Create border-end-end-radius utility classes.
 */
export const useBorderRadiusEndEndUtility = createUseUtility(
	"border-end-end-radius",
	({ value }) => ({
		borderEndEndRadius: value,
	}),
);

/**
 * Create border-end-start-radius utility classes.
 */
export const useBorderRadiusEndStartUtility = createUseUtility(
	"border-end-start-radius",
	({ value }) => ({
		borderEndStartRadius: value,
	}),
);
