import { createUseUtility } from "../../utils";
import { fontSmoothingValues } from "../../values";

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
	{ defaults: fontSmoothingValues },
);
