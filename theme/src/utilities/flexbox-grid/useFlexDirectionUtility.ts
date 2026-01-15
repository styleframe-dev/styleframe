import { createUseUtility } from "../../utils";

/**
 * Default flex-direction utility values matching Tailwind CSS.
 */
export const defaultFlexDirectionValues = {
	row: "row",
	"row-reverse": "row-reverse",
	col: "column",
	"col-reverse": "column-reverse",
};

/**
 * Create flex-direction utility classes.
 */
export const useFlexDirectionUtility = createUseUtility(
	"flex-direction",
	({ value }) => ({
		flexDirection: value,
	}),
	{ defaults: defaultFlexDirectionValues },
);
