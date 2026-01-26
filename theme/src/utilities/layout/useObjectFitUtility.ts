import { createUseUtility } from "../../utils";
import { objectFitValues } from "../../values";

/**
 * Create object-fit utility classes.
 */
export const useObjectFitUtility = createUseUtility(
	"object-fit",
	({ value }) => ({
		objectFit: value,
	}),
	{ defaults: objectFitValues },
);
