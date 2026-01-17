import { useFontWeight, useUtilities } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const {
	fontWeightExtralight,
	fontWeightLight,
	fontWeightNormal,
	fontWeightMedium,
	fontWeightSemibold,
	fontWeightBold,
	fontWeightBlack,
} = useFontWeight(s);

// Register all utilities and generate utility classes
const { createFontWeightUtility } = useUtilities(s);

createFontWeightUtility({
	extralight: s.ref(fontWeightExtralight),
	light: s.ref(fontWeightLight),
	normal: s.ref(fontWeightNormal),
	medium: s.ref(fontWeightMedium),
	semibold: s.ref(fontWeightSemibold),
	bold: s.ref(fontWeightBold),
	black: s.ref(fontWeightBlack),
});

export const fontWeightPreview = s.recipe({
	name: "font-weight-preview",
	base: {
		fontSize: "18px",
		color: "#1e293b",
	},
	variants: {
		fontWeight: {
			extralight: {
				fontWeight: s.ref(fontWeightExtralight),
			},
			light: {
				fontWeight: s.ref(fontWeightLight),
			},
			normal: {
				fontWeight: s.ref(fontWeightNormal),
			},
			medium: {
				fontWeight: s.ref(fontWeightMedium),
			},
			semibold: {
				fontWeight: s.ref(fontWeightSemibold),
			},
			bold: {
				fontWeight: s.ref(fontWeightBold),
			},
			black: {
				fontWeight: s.ref(fontWeightBlack),
			},
		},
	},
	defaultVariants: {
		fontWeight: "normal",
	},
});

s.selector(".font-weight-swatch", {
	display: "flex",
	alignItems: "center",
	gap: "16px",
	padding: "12px 16px",
	borderRadius: "8px",
	background: "#f8fafc",
});

s.selector(".font-weight-name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
	minWidth: "80px",
});

s.selector(".font-weight-value", {
	fontSize: "12px",
	color: "#64748b",
	fontFamily: "monospace",
	minWidth: "40px",
});

s.selector(".font-weight-grid", {
	display: "flex",
	flexDirection: "column",
	gap: "8px",
	padding: "16px",
});

export default s;
