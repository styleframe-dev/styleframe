import { createUseUtility } from "../../utils";

/**
 * Default font-stretch utility values matching Tailwind CSS.
 */
export const defaultFontStretchValues = {
	"ultra-condensed": "ultra-condensed",
	"extra-condensed": "extra-condensed",
	condensed: "condensed",
	"semi-condensed": "semi-condensed",
	normal: "normal",
	"semi-expanded": "semi-expanded",
	expanded: "expanded",
	"extra-expanded": "extra-expanded",
	"ultra-expanded": "ultra-expanded",
};

/**
 * Create font-stretch utility classes.
 */
export const useFontStretchUtility = createUseUtility(
	"font-stretch",
	({ value }) => ({
		fontStretch: value,
	}),
	{ defaults: defaultFontStretchValues },
);
