import { styleframe } from "styleframe";
import { colors } from "../tokens.styleframe";

const s = styleframe();

export const colorTintPreview = s.recipe({
	name: "color-tint-preview",
	base: {
		width: "100px",
		height: "80px",
		borderRadius: "8px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "12px",
		fontWeight: "600",
		color: "#ffffff",
	},
	variants: {
		tint: {
			base: {
				background: s.ref(colors.colorPrimary),
			},
			"50": {
				background: s.ref(colors["colorPrimary-tint-50"]),
			},
			"100": {
				background: s.ref(colors["colorPrimary-tint-100"]),
			},
			"150": {
				background: s.ref(colors["colorPrimary-tint-150"]),
			},
			"200": {
				background: s.ref(colors["colorPrimary-tint-200"]),
			},
		},
	},
	defaultVariants: {
		tint: "base",
	},
});

s.selector(".color-tint-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "8px",
});

s.selector(".color-tint-label", {
	fontSize: "12px",
	color: "#64748b",
});

s.selector(".color-tint-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "16px",
	padding: "16px",
});

export default s;
