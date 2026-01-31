import { useFontSize, useUtilitiesPreset } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

// Exported for use in stories to display values
export const fontSizeValues = {
	xs: "0.75rem",
	sm: "0.875rem",
	md: "1rem",
	lg: "1.125rem",
	xl: "1.25rem",
	"2xl": "1.5rem",
	"3xl": "1.875rem",
	"4xl": "2.25rem",
} as const;

const {
	fontSizeXs,
	fontSizeSm,
	fontSizeMd,
	fontSizeLg,
	fontSizeXl,
	fontSize2xl,
	fontSize3xl,
	fontSize4xl,
} = useFontSize(s, fontSizeValues);

// Register all utilities and generate utility classes
const { createFontSizeUtility } = useUtilitiesPreset(s);

createFontSizeUtility({
	xs: s.ref(fontSizeXs),
	sm: s.ref(fontSizeSm),
	md: s.ref(fontSizeMd),
	lg: s.ref(fontSizeLg),
	xl: s.ref(fontSizeXl),
	"2xl": s.ref(fontSize2xl),
	"3xl": s.ref(fontSize3xl),
	"4xl": s.ref(fontSize4xl),
});

export const fontSizePreview = s.recipe({
	name: "font-size-preview",
	base: {},
	variants: {
		fontSize: {
			xs: {
				fontSize: s.ref(fontSizeXs),
			},
			sm: {
				fontSize: s.ref(fontSizeSm),
			},
			md: {
				fontSize: s.ref(fontSizeMd),
			},
			lg: {
				fontSize: s.ref(fontSizeLg),
			},
			xl: {
				fontSize: s.ref(fontSizeXl),
			},
			"2xl": {
				fontSize: s.ref(fontSize2xl),
			},
			"3xl": {
				fontSize: s.ref(fontSize3xl),
			},
			"4xl": {
				fontSize: s.ref(fontSize4xl),
			},
		},
	},
	defaultVariants: {
		fontSize: "md",
	},
});

export default s;
