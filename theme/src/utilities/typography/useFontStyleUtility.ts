import { createUseUtility } from "../../utils";
import { defaultFontStyleValues } from "../../variables/useFontStyle";

/**
 * Create font-style utility classes.
 */
export const useFontStyleUtility = createUseUtility(
	"font-style",
	({ value }) => ({
		fontStyle: value,
	}),
	{ defaults: defaultFontStyleValues },
);
