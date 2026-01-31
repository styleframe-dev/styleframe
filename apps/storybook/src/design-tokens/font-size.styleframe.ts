import { fontSizeValues as defaultFontSizeValues } from "@styleframe/theme";
import { styleframe } from "styleframe";
import { fontSize } from "../tokens.styleframe";

const s = styleframe();

// Re-export default values for display in stories
export const fontSizeValues = defaultFontSizeValues;

export const fontSizePreview = s.recipe({
	name: "font-size-preview",
	base: {},
	variants: {
		fontSize: {
			xs: {
				fontSize: s.ref(fontSize.fontSizeXs),
			},
			sm: {
				fontSize: s.ref(fontSize.fontSizeSm),
			},
			md: {
				fontSize: s.ref(fontSize.fontSizeMd),
			},
			lg: {
				fontSize: s.ref(fontSize.fontSizeLg),
			},
			xl: {
				fontSize: s.ref(fontSize.fontSizeXl),
			},
			"2xl": {
				fontSize: s.ref(fontSize.fontSize2xl),
			},
			"3xl": {
				fontSize: s.ref(fontSize.fontSize3xl),
			},
			"4xl": {
				fontSize: s.ref(fontSize.fontSize4xl),
			},
		},
	},
	defaultVariants: {
		fontSize: "md",
	},
});

export default s;
