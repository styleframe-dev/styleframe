import { createUseUtility } from "../../utils";

/**
 * Default font-weight utility values matching Tailwind CSS.
 */
export const defaultFontWeightUtilityValues = {
	thin: "100",
	extralight: "200",
	light: "300",
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
	extrabold: "800",
	black: "900",
};

/**
 * Create font-weight utility classes.
 */
export const useFontWeightUtility = createUseUtility(
	"font-weight",
	({ value }) => ({
		fontWeight: value,
	}),
	{ defaults: defaultFontWeightUtilityValues, namespace: "font-weight" },
);
