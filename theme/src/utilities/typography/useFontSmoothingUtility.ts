import { createUseUtility } from "../../utils";

/**
 * Default font-smoothing utility values matching Tailwind CSS.
 */
export const defaultFontSmoothingValues = {
	antialiased: "antialiased",
	"subpixel-antialiased": "auto",
};

/**
 * Create font-smoothing utility classes.
 */
export const useFontSmoothingUtility = createUseUtility(
	"font-smoothing",
	({ value }) => {
		if (value === "antialiased") {
			return {
				WebkitFontSmoothing: "antialiased",
				MozOsxFontSmoothing: "grayscale",
			};
		}
		return {
			WebkitFontSmoothing: "auto",
			MozOsxFontSmoothing: "auto",
		};
	},
	{ defaults: defaultFontSmoothingValues },
);
