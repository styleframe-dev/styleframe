import { styleframe } from "styleframe";
import { colors } from "../tokens.styleframe";

const s = styleframe();

export const colorLightnessPreview = s.recipe({
	name: "color-lightness-preview",
	base: {
		width: "80px",
		height: "80px",
		borderRadius: "8px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "12px",
		fontWeight: "600",
	},
	variants: {
		lightness: {
			"50": {
				background: s.ref(colors["colorPrimary-50"]),
				color: "#1e293b",
			},
			"100": {
				background: s.ref(colors["colorPrimary-100"]),
				color: "#1e293b",
			},
			"200": {
				background: s.ref(colors["colorPrimary-200"]),
				color: "#1e293b",
			},
			"300": {
				background: s.ref(colors["colorPrimary-300"]),
				color: "#1e293b",
			},
			"400": {
				background: s.ref(colors["colorPrimary-400"]),
				color: "#ffffff",
			},
			"500": {
				background: s.ref(colors["colorPrimary-500"]),
				color: "#ffffff",
			},
			"600": {
				background: s.ref(colors["colorPrimary-600"]),
				color: "#ffffff",
			},
			"700": {
				background: s.ref(colors["colorPrimary-700"]),
				color: "#ffffff",
			},
			"800": {
				background: s.ref(colors["colorPrimary-800"]),
				color: "#ffffff",
			},
			"900": {
				background: s.ref(colors["colorPrimary-900"]),
				color: "#ffffff",
			},
			"950": {
				background: s.ref(colors["colorPrimary-950"]),
				color: "#ffffff",
			},
		},
	},
	defaultVariants: {
		lightness: "500",
	},
});

s.selector(".color-lightness-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "8px",
});

s.selector(".color-lightness-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "16px",
	padding: "16px",
});

export default s;
