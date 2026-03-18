import { styleframe } from "virtual:styleframe";
import { useSwatchDimensions } from "../../../theme/useSwatch";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

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

selector(".color-shade-swatch__preview", {
	width: ref(swatchPreviewSize),
	height: ref(swatchPreviewSize),
	borderRadius: ref(swatchBorderRadius),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "12px",
	fontWeight: "600",
	color: "#ffffff",
});

export const colorShadeSwatch = recipe({
	name: "color-shade-swatch",
	base: {},
	variants: {
		variant: {
			base: {
				background: ref(colorPrimary),
			},
			"50": {
				background: ref(colorPrimaryShade50),
			},
			"100": {
				background: ref(colorPrimaryShade100),
			},
			"150": {
				background: ref(colorPrimaryShade150),
			},
			"200": {
				background: ref(colorPrimaryShade200),
			},
		},
	},
	defaultVariants: {
		variant: "base",
	},
});

export default s;
