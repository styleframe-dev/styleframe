import { createUseUtility } from "../../utils";

/**
 * Create list-style-image utility classes.
 */
export const useListStyleImageUtility = createUseUtility(
	"list-style-image",
	({ value }) => ({
		listStyleImage: value,
	}),
);

/**
 * Default list-style-position utility values matching Tailwind CSS.
 */
export const defaultListStylePositionValues = {
	inside: "inside",
	outside: "outside",
};

/**
 * Create list-style-position utility classes.
 */
export const useListStylePositionUtility = createUseUtility(
	"list-style-position",
	({ value }) => ({
		listStylePosition: value,
	}),
	{ defaults: defaultListStylePositionValues },
);

/**
 * Default list-style-type utility values matching Tailwind CSS.
 */
export const defaultListStyleTypeValues = {
	none: "none",
	disc: "disc",
	decimal: "decimal",
};

/**
 * Create list-style-type utility classes.
 */
export const useListStyleTypeUtility = createUseUtility(
	"list-style-type",
	({ value }) => ({
		listStyleType: value,
	}),
	{ defaults: defaultListStyleTypeValues },
);
