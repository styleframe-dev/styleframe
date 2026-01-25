import { createUseUtility } from "../../utils";
import { backgroundPositionValues } from "../../values";

/**
 * Create background-position utility classes.
 */
export const useBackgroundPositionUtility = createUseUtility(
	"background-position",
	({ value }) => ({
		backgroundPosition: value,
	}),
	{ defaults: backgroundPositionValues },
);
