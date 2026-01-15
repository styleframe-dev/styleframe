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
