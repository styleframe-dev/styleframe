import { lineHeightValues as defaultLineHeightValues } from "@styleframe/theme";
import { styleframe } from "styleframe";
import { lineHeight } from "../tokens.styleframe";

const s = styleframe();

// Re-export default values for display in stories
export const lineHeightValues = defaultLineHeightValues;

export const lineHeightPreview = s.recipe({
	name: "line-height-preview",
	base: {},
	variants: {
		lineHeight: {
			tight: {
				lineHeight: s.ref(lineHeight.lineHeightTight),
			},
			snug: {
				lineHeight: s.ref(lineHeight.lineHeightSnug),
			},
			normal: {
				lineHeight: s.ref(lineHeight.lineHeightNormal),
			},
			relaxed: {
				lineHeight: s.ref(lineHeight.lineHeightRelaxed),
			},
			loose: {
				lineHeight: s.ref(lineHeight.lineHeightLoose),
			},
		},
	},
	defaultVariants: {
		lineHeight: "normal",
	},
});

export default s;
