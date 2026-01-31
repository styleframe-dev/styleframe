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
				background: s.ref(colors.colorPrimary50),
				color: "#1e293b",
			},
			"100": {
				background: s.ref(colors.colorPrimary100),
				color: "#1e293b",
			},
			"200": {
				background: s.ref(colors.colorPrimary200),
				color: "#1e293b",
			},
			"300": {
				background: s.ref(colors.colorPrimary300),
				color: "#1e293b",
			},
			"400": {
				background: s.ref(colors.colorPrimary400),
				color: "#ffffff",
			},
			"500": {
				background: s.ref(colors.colorPrimary500),
				color: "#ffffff",
			},
			"600": {
				background: s.ref(colors.colorPrimary600),
				color: "#ffffff",
			},
			"700": {
				background: s.ref(colors.colorPrimary700),
				color: "#ffffff",
			},
			"800": {
				background: s.ref(colors.colorPrimary800),
				color: "#ffffff",
			},
			"900": {
				background: s.ref(colors.colorPrimary900),
				color: "#ffffff",
			},
			"950": {
				background: s.ref(colors.colorPrimary950),
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
