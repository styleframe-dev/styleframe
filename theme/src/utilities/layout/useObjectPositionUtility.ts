import { createUseUtility } from "../../utils";
import { objectPositionValues } from "../../values";

/**
 * Create object-position utility classes.
 */
export const useObjectPositionUtility = createUseUtility(
	"object-position",
	({ value }) => ({
		objectPosition: value,
	}),
	{ defaults: objectPositionValues },
);
