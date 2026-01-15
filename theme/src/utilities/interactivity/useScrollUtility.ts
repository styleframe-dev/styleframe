import { createUseUtility } from "../../utils";

/**
 * Create scroll-margin utility classes.
 */
export const useScrollMarginUtility = createUseUtility(
	"scroll-m",
	({ value }) => ({
		scrollMargin: value,
	}),
);

/**
 * Create scroll-margin-x utility classes.
 */
export const useScrollMarginXUtility = createUseUtility(
	"scroll-mx",
	({ value }) => ({
		scrollMarginLeft: value,
		scrollMarginRight: value,
	}),
);

/**
 * Create scroll-margin-y utility classes.
 */
export const useScrollMarginYUtility = createUseUtility(
	"scroll-my",
	({ value }) => ({
		scrollMarginTop: value,
		scrollMarginBottom: value,
	}),
);

/**
 * Create scroll-margin-top utility classes.
 */
export const useScrollMarginTopUtility = createUseUtility(
	"scroll-mt",
	({ value }) => ({
		scrollMarginTop: value,
	}),
);

/**
 * Create scroll-margin-right utility classes.
 */
export const useScrollMarginRightUtility = createUseUtility(
	"scroll-mr",
	({ value }) => ({
		scrollMarginRight: value,
	}),
);

/**
 * Create scroll-margin-bottom utility classes.
 */
export const useScrollMarginBottomUtility = createUseUtility(
	"scroll-mb",
	({ value }) => ({
		scrollMarginBottom: value,
	}),
);

/**
 * Create scroll-margin-left utility classes.
 */
export const useScrollMarginLeftUtility = createUseUtility(
	"scroll-ml",
	({ value }) => ({
		scrollMarginLeft: value,
	}),
);

/**
 * Create scroll-margin-start utility classes.
 */
export const useScrollMarginStartUtility = createUseUtility(
	"scroll-ms",
	({ value }) => ({
		scrollMarginInlineStart: value,
	}),
);

/**
 * Create scroll-margin-end utility classes.
 */
export const useScrollMarginEndUtility = createUseUtility(
	"scroll-me",
	({ value }) => ({
		scrollMarginInlineEnd: value,
	}),
);

/**
 * Create scroll-padding utility classes.
 */
export const useScrollPaddingUtility = createUseUtility(
	"scroll-p",
	({ value }) => ({
		scrollPadding: value,
	}),
);

/**
 * Create scroll-padding-x utility classes.
 */
export const useScrollPaddingXUtility = createUseUtility(
	"scroll-px",
	({ value }) => ({
		scrollPaddingLeft: value,
		scrollPaddingRight: value,
	}),
);

/**
 * Create scroll-padding-y utility classes.
 */
export const useScrollPaddingYUtility = createUseUtility(
	"scroll-py",
	({ value }) => ({
		scrollPaddingTop: value,
		scrollPaddingBottom: value,
	}),
);

/**
 * Create scroll-padding-top utility classes.
 */
export const useScrollPaddingTopUtility = createUseUtility(
	"scroll-pt",
	({ value }) => ({
		scrollPaddingTop: value,
	}),
);

/**
 * Create scroll-padding-right utility classes.
 */
export const useScrollPaddingRightUtility = createUseUtility(
	"scroll-pr",
	({ value }) => ({
		scrollPaddingRight: value,
	}),
);

/**
 * Create scroll-padding-bottom utility classes.
 */
export const useScrollPaddingBottomUtility = createUseUtility(
	"scroll-pb",
	({ value }) => ({
		scrollPaddingBottom: value,
	}),
);

/**
 * Create scroll-padding-left utility classes.
 */
export const useScrollPaddingLeftUtility = createUseUtility(
	"scroll-pl",
	({ value }) => ({
		scrollPaddingLeft: value,
	}),
);

/**
 * Create scroll-padding-start utility classes.
 */
export const useScrollPaddingStartUtility = createUseUtility(
	"scroll-ps",
	({ value }) => ({
		scrollPaddingInlineStart: value,
	}),
);

/**
 * Create scroll-padding-end utility classes.
 */
export const useScrollPaddingEndUtility = createUseUtility(
	"scroll-pe",
	({ value }) => ({
		scrollPaddingInlineEnd: value,
	}),
);
