import { createUseUtility } from "../../utils";
import { clearValues } from "../../values";

/**
 * Create clear utility classes.
 */
export const useClearUtility = createUseUtility(
	"clear",
	({ value }) => ({
		clear: value,
	}),
	{ defaults: clearValues },
);
