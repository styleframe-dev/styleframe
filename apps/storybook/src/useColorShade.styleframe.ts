import { useColor, useColorShade } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const { colorPrimary } = useColor(s, {
	primary: "#3B82F6",
} as const);

const {
	colorPrimaryShade50,
	colorPrimaryShade100,
	colorPrimaryShade150,
	colorPrimaryShade200,
} = useColorShade(s, colorPrimary, {
	50: 5,
	100: 10,
	150: 15,
	200: 20,
});

export const colorShadePreview = s.recipe({
	name: "color-shade-preview",
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
		shade: {
			base: {
				background: s.ref(colorPrimary),
			},
			"50": {
				background: s.ref(colorPrimaryShade50),
			},
			"100": {
				background: s.ref(colorPrimaryShade100),
			},
			"150": {
				background: s.ref(colorPrimaryShade150),
			},
			"200": {
				background: s.ref(colorPrimaryShade200),
			},
		},
	},
	defaultVariants: {
		shade: "base",
	},
});

s.selector(".color-shade-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "8px",
});

s.selector(".color-shade-label", {
	fontSize: "12px",
	color: "#64748b",
});

s.selector(".color-shade-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "16px",
	padding: "16px",
});

export default s;
