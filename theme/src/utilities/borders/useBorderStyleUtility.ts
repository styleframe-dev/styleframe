import { createUseUtility } from "../../utils";

/**
 * Default border-style utility values matching Tailwind CSS.
 */
export const defaultBorderStyleUtilityValues = {
	solid: "solid",
	dashed: "dashed",
	dotted: "dotted",
	double: "double",
	hidden: "hidden",
	none: "none",
};

/**
 * Create border-style utility classes.
 */
export const useBorderStyleUtility = createUseUtility(
	"border-style",
	({ value }) => ({
		borderStyle: value,
	}),
	{ defaults: defaultBorderStyleUtilityValues },
);

/**
 * Create border-x-style utility classes.
 */
export const useBorderStyleXUtility = createUseUtility(
	"border-x-style",
	({ value }) => ({
		borderLeftStyle: value,
		borderRightStyle: value,
	}),
	{ defaults: defaultBorderStyleUtilityValues },
);

/**
 * Create border-y-style utility classes.
 */
export const useBorderStyleYUtility = createUseUtility(
	"border-y-style",
	({ value }) => ({
		borderTopStyle: value,
		borderBottomStyle: value,
	}),
	{ defaults: defaultBorderStyleUtilityValues },
);

/**
 * Create border-top-style utility classes.
 */
export const useBorderStyleTopUtility = createUseUtility(
	"border-top-style",
	({ value }) => ({
		borderTopStyle: value,
	}),
	{ defaults: defaultBorderStyleUtilityValues },
);

/**
 * Create border-right-style utility classes.
 */
export const useBorderStyleRightUtility = createUseUtility(
	"border-right-style",
	({ value }) => ({
		borderRightStyle: value,
	}),
	{ defaults: defaultBorderStyleUtilityValues },
);

/**
 * Create border-bottom-style utility classes.
 */
export const useBorderStyleBottomUtility = createUseUtility(
	"border-bottom-style",
	({ value }) => ({
		borderBottomStyle: value,
	}),
	{ defaults: defaultBorderStyleUtilityValues },
);

/**
 * Create border-left-style utility classes.
 */
export const useBorderStyleLeftUtility = createUseUtility(
	"border-left-style",
	({ value }) => ({
		borderLeftStyle: value,
	}),
	{ defaults: defaultBorderStyleUtilityValues },
);

/**
 * Create border-inline-start-style utility classes.
 */
export const useBorderStyleStartUtility = createUseUtility(
	"border-inline-start-style",
	({ value }) => ({
		borderInlineStartStyle: value,
	}),
	{ defaults: defaultBorderStyleUtilityValues },
);

/**
 * Create border-inline-end-style utility classes.
 */
export const useBorderStyleEndUtility = createUseUtility(
	"border-inline-end-style",
	({ value }) => ({
		borderInlineEndStyle: value,
	}),
	{ defaults: defaultBorderStyleUtilityValues },
);
