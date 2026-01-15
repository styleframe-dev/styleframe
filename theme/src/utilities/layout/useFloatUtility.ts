import { createUseUtility } from "../../utils";

/**
 * Default float utility values matching Tailwind CSS.
 */
export const defaultFloatValues = {
	start: "inline-start",
	end: "inline-end",
	right: "right",
	left: "left",
	none: "none",
};

/**
 * Create float utility classes.
 */
export const useFloatUtility = createUseUtility(
	"float",
	({ value }) => ({
		float: value,
	}),
	{ defaults: defaultFloatValues },
);
