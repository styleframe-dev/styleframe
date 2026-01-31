import { useColor } from "@styleframe/theme";
import { styleframe } from "styleframe";
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

const {
	colorPrimary,
	colorSecondary,
	colorInfo,
	colorSuccess,
	colorWarning,
	colorDanger,
} = useColor(s, {
	primary: "#1E3A8A",
	secondary: "#9333EA",
	info: "#3B82F6",
	success: "#10B981",
	warning: "#F59E0B",
	danger: "#EF4444",
} as const);

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
				background: s.ref(colorPrimary),
			},
			secondary: {
				background: s.ref(colorSecondary),
			},
			info: {
				background: s.ref(colorInfo),
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
		},
	},
	defaultVariants: {
		color: "primary",
	},
});

export default s;
