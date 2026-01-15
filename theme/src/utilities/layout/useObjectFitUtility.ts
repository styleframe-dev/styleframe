import { createUseUtility } from "../../utils";

/**
 * Default object-fit utility values matching Tailwind CSS.
 */
export const defaultObjectFitValues = {
	contain: "contain",
	cover: "cover",
	fill: "fill",
	none: "none",
	"scale-down": "scale-down",
};

/**
 * Create object-fit utility classes.
 */
export const useObjectFitUtility = createUseUtility(
	"object-fit",
	({ value }) => ({
		objectFit: value,
	}),
	{ defaults: defaultObjectFitValues },
);
