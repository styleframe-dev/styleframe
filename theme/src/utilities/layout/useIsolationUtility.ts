import { createUseUtility } from "../../utils";
import { isolationValues } from "../../values";

/**
 * Create isolation utility classes.
 */
export const useIsolationUtility = createUseUtility(
	"isolation",
	({ value }) => ({
		isolation: value,
	}),
	{ defaults: isolationValues },
);
