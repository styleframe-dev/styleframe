import { createUseUtility } from "../../utils";
import { backgroundRepeatValues } from "../../values";

/**
 * Create background-repeat utility classes.
 */
export const useBackgroundRepeatUtility = createUseUtility(
	"background-repeat",
	({ value }) => ({
		backgroundRepeat: value,
	}),
	{ defaults: backgroundRepeatValues },
);
