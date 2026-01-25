import { createUseUtility } from "../../utils";
import { fontVariantNumericValues } from "../../values";

/**
 * Create font-variant-numeric utility classes.
 */
export const useFontVariantNumericUtility = createUseUtility(
	"font-variant-numeric",
	({ value }) => ({
		fontVariantNumeric: value,
	}),
	{ defaults: fontVariantNumericValues },
);
