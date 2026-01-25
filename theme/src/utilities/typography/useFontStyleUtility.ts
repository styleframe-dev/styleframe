import { createUseUtility } from "../../utils";
import { fontStyleValues } from "../../variables/useFontStyle";

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
