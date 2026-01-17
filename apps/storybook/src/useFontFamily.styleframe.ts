import { useFontFamily } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const { fontFamilyBase, fontFamilyPrint, fontFamilyMono } = useFontFamily(s);

// Create font-family utility and generate utility classes
const createFontFamily = s.utility("font-family", ({ value }) => ({
	fontFamily: value,
}));

createFontFamily({
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

s.selector(".font-family-swatch", {
	display: "flex",
	flexDirection: "column",
	gap: "8px",
	padding: "16px",
	borderRadius: "8px",
	background: "#f8fafc",
});

s.selector(".font-family-name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
});

s.selector(".font-family-grid", {
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	padding: "16px",
});

export default s;
