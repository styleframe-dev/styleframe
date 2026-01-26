import { createUseUtility } from "../../utils";
import { flexWrapValues } from "../../values";

/**
 * Create flex-wrap utility classes.
 */
export const useFlexWrapUtility = createUseUtility(
	"flex-wrap",
	({ value }) => ({
		flexWrap: value,
	}),
	{ defaults: flexWrapValues },
);
