import { createUseUtility } from "../../utils";
import { floatValues } from "../../values";

/**
 * Create float utility classes.
 */
export const useFloatUtility = createUseUtility(
	"float",
	({ value }) => ({
		float: value,
	}),
	{ defaults: floatValues },
);
