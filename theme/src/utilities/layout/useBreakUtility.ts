import { createUseUtility } from "../../utils";

/**
 * Default break-after utility values matching Tailwind CSS.
 */
export const defaultBreakAfterValues = {
	auto: "auto",
	avoid: "avoid",
	all: "all",
	"avoid-page": "avoid-page",
	page: "page",
	left: "left",
	right: "right",
	column: "column",
};

/**
 * Default break-before utility values matching Tailwind CSS.
 */
export const defaultBreakBeforeValues = {
	auto: "auto",
	avoid: "avoid",
	all: "all",
	"avoid-page": "avoid-page",
	page: "page",
	left: "left",
	right: "right",
	column: "column",
};

/**
 * Default break-inside utility values matching Tailwind CSS.
 */
export const defaultBreakInsideValues = {
	auto: "auto",
	avoid: "avoid",
	"avoid-page": "avoid-page",
	"avoid-column": "avoid-column",
};

/**
 * Create break-after utility classes.
 */
export const useBreakAfterUtility = createUseUtility(
	"break-after",
	({ value }) => ({
		breakAfter: value,
	}),
	{ defaults: defaultBreakAfterValues },
);

/**
 * Create break-before utility classes.
 */
export const useBreakBeforeUtility = createUseUtility(
	"break-before",
	({ value }) => ({
		breakBefore: value,
	}),
	{ defaults: defaultBreakBeforeValues },
);

/**
 * Create break-inside utility classes.
 */
export const useBreakInsideUtility = createUseUtility(
	"break-inside",
	({ value }) => ({
		breakInside: value,
	}),
	{ defaults: defaultBreakInsideValues },
);
