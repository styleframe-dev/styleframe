import { useScale, useUtilities } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const {
	scaleMinorSecond,
	scaleMajorSecond,
	scaleMinorThird,
	scaleMajorThird,
	scalePerfectFourth,
	scaleAugmentedFourth,
	scalePerfectFifth,
	scaleGolden,
} = useScale(s);

// Register all utilities
useUtilities(s);

export const scalePreview = s.recipe({
	name: "scale-preview",
	base: {
		display: "flex",
		alignItems: "center",
		gap: "16px",
		padding: "16px",
		borderRadius: "8px",
		background: "#f8fafc",
		borderLeftWidth: "4px",
		borderLeftStyle: "solid",
		borderLeftColor: "#1E3A8A",
	},
	variants: {
		scale: {
			"minor-second": {},
			"major-second": {},
			"minor-third": {},
			"major-third": {},
			"perfect-fourth": {},
			"augmented-fourth": {},
			"perfect-fifth": {},
			golden: {},
		},
	},
	defaultVariants: {
		scale: "minor-third",
	},
});

s.selector(".scale-name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
	minWidth: "140px",
});

s.selector(".scale-value", {
	fontSize: "14px",
	color: "#64748b",
	fontFamily: "monospace",
});

s.selector(".scale-bars", {
	display: "flex",
	alignItems: "flex-end",
	gap: "4px",
	height: "40px",
});

s.selector(".scale-bar", {
	width: "12px",
	borderRadius: "2px",
	background: "#1E3A8A",
});

s.selector(".scale-swatch", {
	display: "flex",
	flexDirection: "column",
	gap: "8px",
	width: "100%",
});

s.selector(".scale-grid", {
	display: "flex",
	flexDirection: "column",
	gap: "12px",
	padding: "16px",
	width: "100%",
	maxWidth: "600px",
});

export default s;
