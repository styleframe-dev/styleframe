import { useScale, useUtilitiesPreset } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

// Exported for use in stories to display values
export const scaleValues = {
	"minor-second": "1.067",
	"major-second": "1.125",
	"minor-third": "1.200",
	"major-third": "1.250",
	"perfect-fourth": "1.333",
	"augmented-fourth": "1.414",
	"perfect-fifth": "1.500",
	golden: "1.618",
} as const;

// Exported for use in stories for bar height calculations
export const scaleRatios = {
	"minor-second": 1.067,
	"major-second": 1.125,
	"minor-third": 1.2,
	"major-third": 1.25,
	"perfect-fourth": 1.333,
	"augmented-fourth": 1.414,
	"perfect-fifth": 1.5,
	golden: 1.618,
} as const;

// Register scale variables (used by the theme)
useScale(s);

// Register all utilities
useUtilitiesPreset(s);

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
