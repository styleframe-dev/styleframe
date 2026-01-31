import { scaleValues as defaultScaleValues } from "@styleframe/theme";
import { styleframe } from "styleframe";
import { colors } from "../tokens.styleframe";

const s = styleframe();

// Re-export default values for display in stories
export const scaleValues = defaultScaleValues;

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
	background: s.ref(colors.colorPrimary),
});

export default s;
