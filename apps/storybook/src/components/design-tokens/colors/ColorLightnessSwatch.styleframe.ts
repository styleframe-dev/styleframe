import { styleframe } from "virtual:styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

useUtilitiesPreset(s);

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
} = useDesignTokensPreset(s);

selector(".color-lightness-swatch__preview", {
	width: "calc(@spacing * 6)",
	height: "calc(@spacing * 6)",
	borderRadius: "@border-radius.lg",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "12px",
	fontWeight: "@font-weight.semibold",
});

export const colorLightnessSwatch = recipe({
	name: "color-lightness-swatch",
	base: {},
	variants: {
		variant: {
			"50": {
				background: ref(colorPrimary50),
				color: "#1e293b",
			},
			"100": {
				background: ref(colorPrimary100),
				color: "#1e293b",
			},
			"200": {
				background: ref(colorPrimary200),
				color: "#1e293b",
			},
			"300": {
				background: ref(colorPrimary300),
				color: "#1e293b",
			},
			"400": {
				background: ref(colorPrimary400),
				color: "#ffffff",
			},
			"500": {
				background: ref(colorPrimary500),
				color: "#ffffff",
			},
			"600": {
				background: ref(colorPrimary600),
				color: "#ffffff",
			},
			"700": {
				background: ref(colorPrimary700),
				color: "#ffffff",
			},
			"800": {
				background: ref(colorPrimary800),
				color: "#ffffff",
			},
			"900": {
				background: ref(colorPrimary900),
				color: "#ffffff",
			},
			"950": {
				background: ref(colorPrimary950),
				color: "#ffffff",
			},
		},
	},
	defaultVariants: {
		variant: "500",
	},
});

export default s;
