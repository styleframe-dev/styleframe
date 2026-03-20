import { createUseUtility } from "../../utils";
import { fontStyleValues } from "../../values";

/**
 * Create font-style utility classes.
 */
export const useFontStyleUtility = createUseUtility(
	"font-style",
	({ value }) => ({
		fontStyle: value,
	}),
	{ defaults: fontStyleValues },
);
