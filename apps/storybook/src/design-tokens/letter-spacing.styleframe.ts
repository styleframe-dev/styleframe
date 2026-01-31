import { useLetterSpacing, useUtilitiesPreset } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

// Exported for use in stories to display values
export const letterSpacingValues = {
	tighter: "-0.05em",
	tight: "-0.025em",
	normal: "normal",
	wide: "0.05em",
	wider: "0.1em",
} as const;

const {
	letterSpacingTighter,
	letterSpacingTight,
	letterSpacingNormal,
	letterSpacingWide,
	letterSpacingWider,
} = useLetterSpacing(s);

// Register all utilities and generate utility classes
const { createLetterSpacingUtility } = useUtilitiesPreset(s);

createLetterSpacingUtility({
	tighter: s.ref(letterSpacingTighter),
	tight: s.ref(letterSpacingTight),
	normal: s.ref(letterSpacingNormal),
	wide: s.ref(letterSpacingWide),
	wider: s.ref(letterSpacingWider),
});

export const letterSpacingPreview = s.recipe({
	name: "letter-spacing-preview",
	base: {
		fontSize: "16px",
		color: "#1e293b",
		textTransform: "uppercase",
	},
	variants: {
		letterSpacing: {
			tighter: {
				letterSpacing: s.ref(letterSpacingTighter),
			},
			tight: {
				letterSpacing: s.ref(letterSpacingTight),
			},
			normal: {
				letterSpacing: s.ref(letterSpacingNormal),
			},
			wide: {
				letterSpacing: s.ref(letterSpacingWide),
			},
			wider: {
				letterSpacing: s.ref(letterSpacingWider),
			},
		},
	},
	defaultVariants: {
		letterSpacing: "normal",
	},
});

export default s;
