import { styleframe } from "virtual:styleframe";
import { useSwatchDimensions } from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

useUtilitiesPreset(s);

const { colors } = useDesignTokensPreset(s);
const {
	colorBlack,
	colorWhite,
	colorPrimary,
	colorSecondary,
	colorSuccess,
	colorWarning,
	colorDanger,
	colorInfo,
	colorNeutral,
} = colors;

const { swatchPreviewSize, swatchBorderRadius } = useSwatchDimensions(s);

s.selector(".color-swatch__preview", {
	width: s.ref(swatchPreviewSize),
	height: s.ref(swatchPreviewSize),
	borderRadius: s.ref(swatchBorderRadius),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "12px",
	fontWeight: "600",
});

export const colorSwatch = s.recipe({
	name: "color-swatch",
	base: {
		color: s.ref(colorBlack),
	},
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
			neutral: {
				background: s.ref(colorNeutral),
			},
			white: {
				background: s.ref(colorWhite),
			},
			black: {
				color: s.ref(colorWhite),
				background: s.ref(colorBlack),
			},
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

export default s;
