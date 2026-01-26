import { createUseUtility } from "../../utils";
import { verticalAlignValues } from "../../values";

/**
 * Create vertical-align utility classes.
 */
export const useVerticalAlignUtility = createUseUtility(
	"vertical-align",
	({ value }) => ({
		verticalAlign: value,
	}),
	{ defaults: verticalAlignValues },
);
