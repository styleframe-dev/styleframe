import { createUseSpacingUtility } from "../../utils";

/**
 * Create inset utility classes (top, right, bottom, left) with multiplier support.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useInsetUtility(s, { '0': '0', '1': '0.25rem', auto: 'auto' });
 * ```
 */
export const useInsetUtility = createUseSpacingUtility(
	"inset",
	({ value }) => ({
		top: value,
		right: value,
		bottom: value,
		left: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create inset-x utility classes (left and right).
 */
export const useInsetXUtility = createUseSpacingUtility(
	"inset-x",
	({ value }) => ({
		left: value,
		right: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create inset-y utility classes (top and bottom).
 */
export const useInsetYUtility = createUseSpacingUtility(
	"inset-y",
	({ value }) => ({
		top: value,
		bottom: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create inset-inline-start utility classes.
 */
export const useInsetStartUtility = createUseSpacingUtility(
	"inset-inline-start",
	({ value }) => ({
		insetInlineStart: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create inset-inline-end utility classes.
 */
export const useInsetEndUtility = createUseSpacingUtility(
	"inset-inline-end",
	({ value }) => ({
		insetInlineEnd: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create top utility classes.
 */
export const useTopUtility = createUseSpacingUtility(
	"top",
	({ value }) => ({
		top: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create right utility classes.
 */
export const useRightUtility = createUseSpacingUtility(
	"right",
	({ value }) => ({
		right: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create bottom utility classes.
 */
export const useBottomUtility = createUseSpacingUtility(
	"bottom",
	({ value }) => ({
		bottom: value,
	}),
	{ namespace: "spacing" },
);

/**
 * Create left utility classes.
 */
export const useLeftUtility = createUseSpacingUtility(
	"left",
	({ value }) => ({
		left: value,
	}),
	{ namespace: "spacing" },
);
