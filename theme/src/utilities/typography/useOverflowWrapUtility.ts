import { createUseUtility } from "../../utils";

/**
 * Default overflow-wrap utility values matching Tailwind CSS.
 */
export const defaultOverflowWrapValues = {
	normal: "normal",
	"break-word": "break-word",
	anywhere: "anywhere",
};

/**
 * Create overflow-wrap utility classes.
 */
export const useOverflowWrapUtility = createUseUtility(
	"overflow-wrap",
	({ value }) => ({
		overflowWrap: value,
	}),
	{ defaults: defaultOverflowWrapValues },
);
