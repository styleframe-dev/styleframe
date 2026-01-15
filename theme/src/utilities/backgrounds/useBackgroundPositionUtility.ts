import { createUseUtility } from "../../utils";

/**
 * Default background-position utility values matching Tailwind CSS.
 */
export const defaultBackgroundPositionValues = {
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
 * Create background-position utility classes.
 */
export const useBackgroundPositionUtility = createUseUtility(
	"background-position",
	({ value }) => ({
		backgroundPosition: value,
	}),
	{ defaults: defaultBackgroundPositionValues },
);
