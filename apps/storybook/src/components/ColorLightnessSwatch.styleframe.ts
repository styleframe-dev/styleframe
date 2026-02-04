import { styleframe } from "virtual:styleframe";
import { useSwatchDimensions } from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

useUtilitiesPreset(s);

const { colors } = useDesignTokensPreset(s);
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
} = colors;

const { swatchPreviewSize, swatchBorderRadius } = useSwatchDimensions(s);

s.selector(".color-lightness-swatch__preview", {
	width: s.ref(swatchPreviewSize),
	height: s.ref(swatchPreviewSize),
	borderRadius: s.ref(swatchBorderRadius),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "12px",
	fontWeight: "600",
});

export const colorLightnessSwatch = s.recipe({
	name: "color-lightness-swatch",
	base: {},
	variants: {
		variant: {
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
		variant: "500",
	},
});

export default s;
