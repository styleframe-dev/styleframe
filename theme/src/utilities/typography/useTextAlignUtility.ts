import { createUseUtility } from "../../utils";

/**
 * Default text-align utility values matching Tailwind CSS.
 */
export const defaultTextAlignValues = {
	left: "left",
	center: "center",
	right: "right",
	justify: "justify",
	start: "start",
	end: "end",
};

/**
 * Create text-align utility classes.
 */
export const useTextAlignUtility = createUseUtility(
	"text-align",
	({ value }) => ({
		textAlign: value,
	}),
	{ defaults: defaultTextAlignValues },
);
