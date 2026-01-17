import { useLineHeight, useUtilities } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const {
	lineHeightTight,
	lineHeightSnug,
	lineHeightNormal,
	lineHeightRelaxed,
	lineHeightLoose,
} = useLineHeight(s);

// Register all utilities and generate utility classes
const { createLineHeightUtility } = useUtilities(s);

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

s.selector(".line-height-swatch", {
	display: "flex",
	flexDirection: "column",
	gap: "8px",
	padding: "16px",
	borderRadius: "8px",
	background: "#f8fafc",
});

s.selector(".line-height-header", {
	display: "flex",
	alignItems: "center",
	gap: "12px",
});

s.selector(".line-height-name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
});

s.selector(".line-height-value", {
	fontSize: "12px",
	color: "#64748b",
	fontFamily: "monospace",
});

s.selector(".line-height-grid", {
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	padding: "16px",
});

export default s;
