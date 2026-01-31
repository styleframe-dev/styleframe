import { styleframe } from "styleframe";
import { colors as designTokenColors } from "../tokens.styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
	useSwatchTypography,
	useSwatchDimensions,
} from "./primitives/tokens.styleframe";

const s = styleframe();

const { swatchColorTertiary } = useSwatchColors(s);
const { swatchGapSm } = useSwatchSpacing(s);
const { swatchFontSize, swatchFontWeightNormal } = useSwatchTypography(s);
const { swatchPreviewSize, swatchBorderRadius } = useSwatchDimensions(s);

export const colors = [
	"primary",
	"secondary",
	"info",
	"success",
	"warning",
	"danger",
] as const;

export type Color = (typeof colors)[number];

s.selector(".color-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: s.ref(swatchGapSm),
});

s.selector(".color-swatch__preview", {
	width: s.ref(swatchPreviewSize),
	height: s.ref(swatchPreviewSize),
	borderRadius: s.ref(swatchBorderRadius),
});

s.selector(".color-swatch__name", {
	fontSize: s.ref(swatchFontSize),
	fontWeight: s.ref(swatchFontWeightNormal),
	color: s.ref(swatchColorTertiary),
});

export const colorPreview = s.recipe({
	name: "color-preview",
	base: {},
	variants: {
		color: {
			primary: {
				background: s.ref(designTokenColors.colorPrimary),
			},
			secondary: {
				background: s.ref(designTokenColors.colorSecondary),
			},
			info: {
				background: s.ref(designTokenColors.colorInfo),
			},
			success: {
				background: s.ref(designTokenColors.colorSuccess),
			},
			warning: {
				background: s.ref(designTokenColors.colorWarning),
			},
			danger: {
				background: s.ref(designTokenColors.colorDanger),
			},
		},
	},
	defaultVariants: {
		color: "primary",
	},
});

export default s;
