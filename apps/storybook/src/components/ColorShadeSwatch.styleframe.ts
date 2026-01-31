import { styleframe } from "styleframe";
import { useSwatchDimensions } from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

useUtilitiesPreset(s);

const { colors } = useDesignTokensPreset(s);
const {
	colorPrimary,
	colorPrimaryShade50,
	colorPrimaryShade100,
	colorPrimaryShade150,
	colorPrimaryShade200,
} = colors;

const { swatchPreviewSize, swatchBorderRadius } = useSwatchDimensions(s);

s.selector(".color-shade-swatch__preview", {
	width: s.ref(swatchPreviewSize),
	height: s.ref(swatchPreviewSize),
	borderRadius: s.ref(swatchBorderRadius),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "12px",
	fontWeight: "600",
	color: "#ffffff",
});

export const colorShadeSwatch = s.recipe({
	name: "color-shade-swatch",
	base: {},
	variants: {
		variant: {
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
		variant: "base",
	},
});

export default s;
