import { letterSpacingValues as defaultLetterSpacingValues } from "@styleframe/theme";
import { styleframe } from "styleframe";
import { letterSpacing } from "../tokens.styleframe";

const s = styleframe();

// Re-export default values for display in stories
export const letterSpacingValues = defaultLetterSpacingValues;

export const letterSpacingPreview = s.recipe({
	name: "letter-spacing-preview",
	base: {},
	variants: {
		letterSpacing: {
			tighter: {
				letterSpacing: s.ref(letterSpacing.letterSpacingTighter),
			},
			tight: {
				letterSpacing: s.ref(letterSpacing.letterSpacingTight),
			},
			normal: {
				letterSpacing: s.ref(letterSpacing.letterSpacingNormal),
			},
			wide: {
				letterSpacing: s.ref(letterSpacing.letterSpacingWide),
			},
			wider: {
				letterSpacing: s.ref(letterSpacing.letterSpacingWider),
			},
		},
	},
	defaultVariants: {
		letterSpacing: "normal",
	},
});

export default s;
