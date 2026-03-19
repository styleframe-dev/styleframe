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
	colorSecondary,
	colorSecondaryShade50,
	colorSecondaryShade100,
	colorSecondaryShade150,
	colorSecondaryShade200,
	colorSuccess,
	colorSuccessShade50,
	colorSuccessShade100,
	colorSuccessShade150,
	colorSuccessShade200,
	colorWarning,
	colorWarningShade50,
	colorWarningShade100,
	colorWarningShade150,
	colorWarningShade200,
	colorDanger,
	colorDangerShade50,
	colorDangerShade100,
	colorDangerShade150,
	colorDangerShade200,
	colorInfo,
	colorInfoShade50,
	colorInfoShade100,
	colorInfoShade150,
	colorInfoShade200,
	colorGray,
	colorGrayShade50,
	colorGrayShade100,
	colorGrayShade150,
	colorGrayShade200,
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
			"primary-base": { background: ref(colorPrimary) },
			"primary-50": { background: ref(colorPrimaryShade50) },
			"primary-100": { background: ref(colorPrimaryShade100) },
			"primary-150": { background: ref(colorPrimaryShade150) },
			"primary-200": { background: ref(colorPrimaryShade200) },
			"secondary-base": { background: ref(colorSecondary) },
			"secondary-50": { background: ref(colorSecondaryShade50) },
			"secondary-100": { background: ref(colorSecondaryShade100) },
			"secondary-150": { background: ref(colorSecondaryShade150) },
			"secondary-200": { background: ref(colorSecondaryShade200) },
			"success-base": { background: ref(colorSuccess) },
			"success-50": { background: ref(colorSuccessShade50) },
			"success-100": { background: ref(colorSuccessShade100) },
			"success-150": { background: ref(colorSuccessShade150) },
			"success-200": { background: ref(colorSuccessShade200) },
			"warning-base": { background: ref(colorWarning) },
			"warning-50": { background: ref(colorWarningShade50) },
			"warning-100": { background: ref(colorWarningShade100) },
			"warning-150": { background: ref(colorWarningShade150) },
			"warning-200": { background: ref(colorWarningShade200) },
			"danger-base": { background: ref(colorDanger) },
			"danger-50": { background: ref(colorDangerShade50) },
			"danger-100": { background: ref(colorDangerShade100) },
			"danger-150": { background: ref(colorDangerShade150) },
			"danger-200": { background: ref(colorDangerShade200) },
			"info-base": { background: ref(colorInfo) },
			"info-50": { background: ref(colorInfoShade50) },
			"info-100": { background: ref(colorInfoShade100) },
			"info-150": { background: ref(colorInfoShade150) },
			"info-200": { background: ref(colorInfoShade200) },
			"gray-base": { background: ref(colorGray) },
			"gray-50": { background: ref(colorGrayShade50) },
			"gray-100": { background: ref(colorGrayShade100) },
			"gray-150": { background: ref(colorGrayShade150) },
			"gray-200": { background: ref(colorGrayShade200) },
		},
	},
	defaultVariants: {
		variant: "primary-base",
	},
});

export default s;
