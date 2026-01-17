import { useColor, useColorTint } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const { colorPrimary } = useColor(s, {
	primary: "#1E3A8A",
} as const);

const {
	colorPrimaryTint50,
	colorPrimaryTint100,
	colorPrimaryTint150,
	colorPrimaryTint200,
} = useColorTint(s, colorPrimary, {
	50: 5,
	100: 10,
	150: 15,
	200: 20,
});

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
				background: s.ref(colorPrimary),
			},
			"50": {
				background: s.ref(colorPrimaryTint50),
			},
			"100": {
				background: s.ref(colorPrimaryTint100),
			},
			"150": {
				background: s.ref(colorPrimaryTint150),
			},
			"200": {
				background: s.ref(colorPrimaryTint200),
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
