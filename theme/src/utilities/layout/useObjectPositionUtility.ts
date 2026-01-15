import { createUseUtility } from "../../utils";

/**
 * Default object-position utility values matching Tailwind CSS.
 */
export const defaultObjectPositionValues = {
	bottom: "bottom",
	center: "center",
	left: "left",
	"left-bottom": "left bottom",
	"left-top": "left top",
	right: "right",
	"right-bottom": "right bottom",
	"right-top": "right top",
	top: "top",
};

/**
 * Create object-position utility classes.
 */
export const useObjectPositionUtility = createUseUtility(
	"object-position",
	({ value }) => ({
		objectPosition: value,
	}),
	{ defaults: defaultObjectPositionValues },
);
