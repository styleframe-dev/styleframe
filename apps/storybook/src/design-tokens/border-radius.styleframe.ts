import { borderRadiusValues as defaultBorderRadiusValues } from "@styleframe/theme";
import { styleframe } from "styleframe";
import { borderRadius } from "../tokens.styleframe";

const s = styleframe();

// Re-export default values for display in stories
export const borderRadiusValues = defaultBorderRadiusValues;

export const borderRadiusPreview = s.recipe({
	name: "border-radius-preview",
	base: {},
	variants: {
		borderRadius: {
			none: {
				borderRadius: s.ref(borderRadius.borderRadiusNone),
			},
			sm: {
				borderRadius: s.ref(borderRadius.borderRadiusSm),
			},
			md: {
				borderRadius: s.ref(borderRadius.borderRadiusMd),
			},
			lg: {
				borderRadius: s.ref(borderRadius.borderRadiusLg),
			},
			xl: {
				borderRadius: s.ref(borderRadius.borderRadiusXl),
			},
			"2xl": {
				borderRadius: s.ref(borderRadius.borderRadius2xl),
			},
			full: {
				borderRadius: s.ref(borderRadius.borderRadiusFull),
			},
		},
	},
	defaultVariants: {
		borderRadius: "md",
	},
});

export default s;
