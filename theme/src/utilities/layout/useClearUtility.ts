import { createUseUtility } from "../../utils";

/**
 * Default clear utility values matching Tailwind CSS.
 */
export const defaultClearValues = {
	start: "inline-start",
	end: "inline-end",
	left: "left",
	right: "right",
	both: "both",
	none: "none",
};

/**
 * Create clear utility classes.
 */
export const useClearUtility = createUseUtility(
	"clear",
	({ value }) => ({
		clear: value,
	}),
	{ defaults: defaultClearValues },
);
