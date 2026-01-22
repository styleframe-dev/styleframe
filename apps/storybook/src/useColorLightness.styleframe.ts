import {
	useColor,
	useColorLightness,
	useDefaultUtilitiesPreset,
} from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const { colorPrimary } = useColor(s, {
	primary: "#1E3A8A",
} as const);

const {
	colorPrimary50,
	colorPrimary100,
	colorPrimary200,
	colorPrimary300,
	colorPrimary400,
	colorPrimary500,
	colorPrimary600,
	colorPrimary700,
	colorPrimary800,
	colorPrimary900,
	colorPrimary950,
} = useColorLightness(s, colorPrimary, {
	50: 95,
	100: 90,
	200: 80,
	300: 70,
	400: 60,
	500: 50,
	600: 40,
	700: 30,
	800: 20,
	900: 10,
	950: 5,
});

// Register all utilities and generate utility classes
const { createBackgroundColorUtility } = useDefaultUtilitiesPreset(s);

createBackgroundColorUtility({
	"primary-50": s.ref(colorPrimary50),
	"primary-100": s.ref(colorPrimary100),
	"primary-200": s.ref(colorPrimary200),
	"primary-300": s.ref(colorPrimary300),
	"primary-400": s.ref(colorPrimary400),
	"primary-500": s.ref(colorPrimary500),
	"primary-600": s.ref(colorPrimary600),
	"primary-700": s.ref(colorPrimary700),
	"primary-800": s.ref(colorPrimary800),
	"primary-900": s.ref(colorPrimary900),
	"primary-950": s.ref(colorPrimary950),
});

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
				background: s.ref(colorPrimary50),
				color: "#1e293b",
			},
			"100": {
				background: s.ref(colorPrimary100),
				color: "#1e293b",
			},
			"200": {
				background: s.ref(colorPrimary200),
				color: "#1e293b",
			},
			"300": {
				background: s.ref(colorPrimary300),
				color: "#1e293b",
			},
			"400": {
				background: s.ref(colorPrimary400),
				color: "#ffffff",
			},
			"500": {
				background: s.ref(colorPrimary500),
				color: "#ffffff",
			},
			"600": {
				background: s.ref(colorPrimary600),
				color: "#ffffff",
			},
			"700": {
				background: s.ref(colorPrimary700),
				color: "#ffffff",
			},
			"800": {
				background: s.ref(colorPrimary800),
				color: "#ffffff",
			},
			"900": {
				background: s.ref(colorPrimary900),
				color: "#ffffff",
			},
			"950": {
				background: s.ref(colorPrimary950),
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
