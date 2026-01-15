import { createUseUtility } from "../../utils";

/**
 * Default font-style utility values matching Tailwind CSS.
 */
export const defaultFontStyleValues = {
	italic: "italic",
	"not-italic": "normal",
};

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
