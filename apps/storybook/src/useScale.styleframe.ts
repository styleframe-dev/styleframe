import { useScale, useUtilities } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

// Register scale variables (used by the theme)
useScale(s);

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

// Styles for scale visualization bars (used by renderPreview in stories)
s.selector(".scale-bars", {
	display: "flex",
	alignItems: "flex-end",
	gap: "4px",
	height: "40px",
	marginLeft: "auto",
});

s.selector(".scale-bar", {
	width: "12px",
	borderRadius: "2px",
	background: "#1E3A8A",
});

export default s;
