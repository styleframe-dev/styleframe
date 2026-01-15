import { createUseUtility } from "../../utils";

/**
 * Default font-variant-numeric utility values matching Tailwind CSS.
 */
export const defaultFontVariantNumericValues = {
	"normal-nums": "normal",
	ordinal: "ordinal",
	"slashed-zero": "slashed-zero",
	"lining-nums": "lining-nums",
	"oldstyle-nums": "oldstyle-nums",
	"proportional-nums": "proportional-nums",
	"tabular-nums": "tabular-nums",
	"diagonal-fractions": "diagonal-fractions",
	"stacked-fractions": "stacked-fractions",
};

/**
 * Create font-variant-numeric utility classes.
 */
export const useFontVariantNumericUtility = createUseUtility(
	"font-variant-numeric",
	({ value }) => ({
		fontVariantNumeric: value,
	}),
	{ defaults: defaultFontVariantNumericValues },
);
