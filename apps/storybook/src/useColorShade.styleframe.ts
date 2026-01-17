import { useColor, useColorShade, useUtilities } from "@styleframe/theme";
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

// Register all utilities and generate utility classes
const { createBackgroundColorUtility } = useUtilities(s);

createBackgroundColorUtility({
	primary: s.ref(colorPrimary),
	"primary-shade-50": s.ref(colorPrimaryShade50),
	"primary-shade-100": s.ref(colorPrimaryShade100),
	"primary-shade-150": s.ref(colorPrimaryShade150),
	"primary-shade-200": s.ref(colorPrimaryShade200),
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

export default s;
