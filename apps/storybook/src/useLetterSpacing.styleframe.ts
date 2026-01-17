import { useLetterSpacing, useUtilities } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const {
	letterSpacingTighter,
	letterSpacingTight,
	letterSpacingNormal,
	letterSpacingWide,
	letterSpacingWider,
} = useLetterSpacing(s);

// Register all utilities and generate utility classes
const { createLetterSpacingUtility } = useUtilities(s);

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

s.selector(".letter-spacing-swatch", {
	display: "flex",
	alignItems: "center",
	gap: "16px",
	padding: "16px",
	borderRadius: "8px",
	background: "#f8fafc",
});

s.selector(".letter-spacing-name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
	minWidth: "60px",
});

s.selector(".letter-spacing-value", {
	fontSize: "12px",
	color: "#64748b",
	fontFamily: "monospace",
	minWidth: "70px",
});

s.selector(".letter-spacing-grid", {
	display: "flex",
	flexDirection: "column",
	gap: "8px",
	padding: "16px",
});

export default s;
