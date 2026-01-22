import { useLineHeight, useDefaultUtilitiesPreset } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

// Exported for use in stories to display values
export const lineHeightValues = {
	tight: "1.2",
	snug: "1.35",
	normal: "1.5",
	relaxed: "1.65",
	loose: "1.9",
} as const;

const {
	lineHeightTight,
	lineHeightSnug,
	lineHeightNormal,
	lineHeightRelaxed,
	lineHeightLoose,
} = useLineHeight(s);

// Register all utilities and generate utility classes
const { createLineHeightUtility } = useDefaultUtilitiesPreset(s);

createLineHeightUtility({
	tight: s.ref(lineHeightTight),
	snug: s.ref(lineHeightSnug),
	normal: s.ref(lineHeightNormal),
	relaxed: s.ref(lineHeightRelaxed),
	loose: s.ref(lineHeightLoose),
});

export const lineHeightPreview = s.recipe({
	name: "line-height-preview",
	base: {
		fontSize: "14px",
		color: "#1e293b",
		maxWidth: "400px",
	},
	variants: {
		lineHeight: {
			tight: {
				lineHeight: s.ref(lineHeightTight),
			},
			snug: {
				lineHeight: s.ref(lineHeightSnug),
			},
			normal: {
				lineHeight: s.ref(lineHeightNormal),
			},
			relaxed: {
				lineHeight: s.ref(lineHeightRelaxed),
			},
			loose: {
				lineHeight: s.ref(lineHeightLoose),
			},
		},
	},
	defaultVariants: {
		lineHeight: "normal",
	},
});

export default s;
