import { styleframe } from "virtual:styleframe";
import { useSwatchDimensions } from "../../../theme/useSwatch";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

useUtilitiesPreset(s);

const { colors } = useDesignTokensPreset(s);
const {
	colorPrimary,
	colorPrimaryTint50,
	colorPrimaryTint100,
	colorPrimaryTint150,
	colorPrimaryTint200,
} = colors;

const { swatchPreviewSize, swatchBorderRadius } = useSwatchDimensions(s);

selector(".color-tint-swatch__preview", {
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

export const colorTintSwatch = recipe({
	name: "color-tint-swatch",
	base: {},
	variants: {
		variant: {
			base: {
				background: ref(colorPrimary),
			},
			"50": {
				background: ref(colorPrimaryTint50),
			},
			"100": {
				background: ref(colorPrimaryTint100),
			},
			"150": {
				background: ref(colorPrimaryTint150),
			},
			"200": {
				background: ref(colorPrimaryTint200),
			},
		},
	},
	defaultVariants: {
		variant: "base",
	},
});

export default s;
