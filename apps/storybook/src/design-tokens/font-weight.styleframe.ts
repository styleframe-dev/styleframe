import { fontWeightValues as defaultFontWeightValues } from "@styleframe/theme";
import { styleframe } from "styleframe";
import { fontWeight } from "../tokens.styleframe";

const s = styleframe();

// Re-export default values for display in stories
export const fontWeightValues = defaultFontWeightValues;

export const fontWeightPreview = s.recipe({
	name: "font-weight-preview",
	base: {},
	variants: {
		fontWeight: {
			extralight: {
				fontWeight: s.ref(fontWeight.fontWeightExtralight),
			},
			light: {
				fontWeight: s.ref(fontWeight.fontWeightLight),
			},
			normal: {
				fontWeight: s.ref(fontWeight.fontWeightNormal),
			},
			medium: {
				fontWeight: s.ref(fontWeight.fontWeightMedium),
			},
			semibold: {
				fontWeight: s.ref(fontWeight.fontWeightSemibold),
			},
			bold: {
				fontWeight: s.ref(fontWeight.fontWeightBold),
			},
			black: {
				fontWeight: s.ref(fontWeight.fontWeightBlack),
			},
		},
	},
	defaultVariants: {
		fontWeight: "normal",
	},
});

export default s;
