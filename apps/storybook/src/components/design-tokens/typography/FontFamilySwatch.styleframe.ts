import { styleframe } from "virtual:styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

useUtilitiesPreset(s);

const { fontFamily } = useDesignTokensPreset(s);
const { fontFamilyBase, fontFamilyPrint, fontFamilyMono } = fontFamily;

selector(".font-family-swatch__preview", {
	color: "@color.text-weakest",
	padding: "@spacing.xs",
});

export const fontFamilySwatch = recipe({
	name: "font-family-swatch",
	base: {},
	variants: {
		variant: {
			base: {
				fontFamily: ref(fontFamilyBase),
			},
			print: {
				fontFamily: ref(fontFamilyPrint),
			},
			mono: {
				fontFamily: ref(fontFamilyMono),
			},
		},
	},
	defaultVariants: {
		variant: "base",
	},
});

export default s;
