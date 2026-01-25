import { createUseUtility } from "../../utils";
import { flexDirectionValues } from "../../values";

/**
 * Create flex-direction utility classes.
 */
export const useFlexDirectionUtility = createUseUtility(
	"flex-direction",
	({ value }) => ({
		flexDirection: value,
	}),
	{ defaults: flexDirectionValues },
);
