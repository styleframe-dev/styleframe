import { createUseUtility } from "../../utils";
import { fontStretchValues } from "../../values";

/**
 * Create font-stretch utility classes.
 */
export const useFontStretchUtility = createUseUtility(
	"font-stretch",
	({ value }) => ({
		fontStretch: value,
	}),
	{ defaults: fontStretchValues },
);
