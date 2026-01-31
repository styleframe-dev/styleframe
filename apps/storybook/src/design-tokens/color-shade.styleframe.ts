import { styleframe } from "styleframe";
import { colors } from "../tokens.styleframe";

const s = styleframe();

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
				background: s.ref(colors.colorPrimary),
			},
			"50": {
				background: s.ref(colors.colorPrimaryShade50),
			},
			"100": {
				background: s.ref(colors.colorPrimaryShade100),
			},
			"150": {
				background: s.ref(colors.colorPrimaryShade150),
			},
			"200": {
				background: s.ref(colors.colorPrimaryShade200),
			},
		},
	},
	defaultVariants: {
		shade: "base",
	},
});

export default s;
