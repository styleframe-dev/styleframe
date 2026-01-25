import { createUseUtility } from "../../utils";
import { backgroundSizeValues } from "../../values";

/**
 * Create background-size utility classes.
 */
export const useBackgroundSizeUtility = createUseUtility(
	"background-size",
	({ value }) => ({
		backgroundSize: value,
	}),
	{ defaults: backgroundSizeValues },
);
