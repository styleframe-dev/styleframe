import { styleframe } from "virtual:styleframe";
import { useSwatchDimensions } from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

useUtilitiesPreset(s);

const { colors } = useDesignTokensPreset(s);
const {
	colorPrimary,
	colorSecondary,
	colorSuccess,
	colorWarning,
	colorDanger,
	colorInfo,
	colorLight,
	colorDark,
} = colors;

const { swatchPreviewSize, swatchBorderRadius } = useSwatchDimensions(s);

s.selector(".color-swatch__preview", {
	width: s.ref(swatchPreviewSize),
	height: s.ref(swatchPreviewSize),
	borderRadius: s.ref(swatchBorderRadius),
});

export const colorSwatch = s.recipe({
	name: "color-swatch",
	base: {},
	variants: {
		variant: {
			primary: {
				background: s.ref(colorPrimary),
			},
			secondary: {
				background: s.ref(colorSecondary),
			},
			success: {
				background: s.ref(colorSuccess),
			},
			warning: {
				background: s.ref(colorWarning),
			},
			danger: {
				background: s.ref(colorDanger),
			},
			info: {
				background: s.ref(colorInfo),
			},
			light: {
				background: s.ref(colorLight),
			},
			dark: {
				background: s.ref(colorDark),
			},
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

export default s;
