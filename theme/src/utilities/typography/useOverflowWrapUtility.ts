import { createUseUtility } from "../../utils";
import { overflowWrapValues } from "../../values";

/**
 * Create overflow-wrap utility classes.
 */
export const useOverflowWrapUtility = createUseUtility(
	"overflow-wrap",
	({ value }) => ({
		overflowWrap: value,
	}),
	{ defaults: overflowWrapValues },
);
