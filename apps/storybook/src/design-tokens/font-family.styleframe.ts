import { styleframe } from "styleframe";
import { fontFamily } from "../tokens.styleframe";

const s = styleframe();

export const fontFamilyPreview = s.recipe({
	name: "font-family-preview",
	base: {},
	variants: {
		fontFamily: {
			base: {
				fontFamily: s.ref(fontFamily.fontFamilyBase),
			},
			print: {
				fontFamily: s.ref(fontFamily.fontFamilyPrint),
			},
			mono: {
				fontFamily: s.ref(fontFamily.fontFamilyMono),
			},
		},
	},
	defaultVariants: {
		fontFamily: "base",
	},
});

export default s;
