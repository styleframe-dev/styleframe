import { styleframe } from "styleframe";
import { useSwatchDimensions } from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

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

s.selector(".color-tint-swatch__preview", {
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

export const colorTintSwatch = s.recipe({
	name: "color-tint-swatch",
	base: {},
	variants: {
		variant: {
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
		variant: "base",
	},
});

export default s;
