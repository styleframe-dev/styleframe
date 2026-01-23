import { useFontFamily, useUtilitiesPreset } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const { fontFamilyBase, fontFamilyPrint, fontFamilyMono } = useFontFamily(s);

// Register all utilities and generate utility classes
const { createFontFamilyUtility } = useUtilitiesPreset(s);

createFontFamilyUtility({
	base: s.ref(fontFamilyBase),
	print: s.ref(fontFamilyPrint),
	mono: s.ref(fontFamilyMono),
});

export const fontFamilyPreview = s.recipe({
	name: "font-family-preview",
	base: {
		fontSize: "18px",
		lineHeight: "1.5",
		color: "#1e293b",
	},
	variants: {
		fontFamily: {
			base: {
				fontFamily: s.ref(fontFamilyBase),
			},
			print: {
				fontFamily: s.ref(fontFamilyPrint),
			},
			mono: {
				fontFamily: s.ref(fontFamilyMono),
			},
		},
	},
	defaultVariants: {
		fontFamily: "base",
	},
});

export default s;
