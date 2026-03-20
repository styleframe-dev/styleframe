import { styleframe } from "virtual:styleframe";
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
	colorSecondary,
	colorSecondaryTint50,
	colorSecondaryTint100,
	colorSecondaryTint150,
	colorSecondaryTint200,
	colorSuccess,
	colorSuccessTint50,
	colorSuccessTint100,
	colorSuccessTint150,
	colorSuccessTint200,
	colorWarning,
	colorWarningTint50,
	colorWarningTint100,
	colorWarningTint150,
	colorWarningTint200,
	colorDanger,
	colorDangerTint50,
	colorDangerTint100,
	colorDangerTint150,
	colorDangerTint200,
	colorInfo,
	colorInfoTint50,
	colorInfoTint100,
	colorInfoTint150,
	colorInfoTint200,
	colorGray,
	colorGrayTint50,
	colorGrayTint100,
	colorGrayTint150,
	colorGrayTint200,
} = colors;

selector(".color-tint-swatch__preview", {
	width: "calc(@spacing * 6)",
	height: "calc(@spacing * 6)",
	borderRadius: "@border-radius.lg",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "12px",
	fontWeight: "@font-weight.semibold",
	color: "#ffffff",
});

export const colorTintSwatch = recipe({
	name: "color-tint-swatch",
	base: {},
	variants: {
		variant: {
			"primary-base": { background: ref(colorPrimary) },
			"primary-50": { background: ref(colorPrimaryTint50) },
			"primary-100": { background: ref(colorPrimaryTint100) },
			"primary-150": { background: ref(colorPrimaryTint150) },
			"primary-200": { background: ref(colorPrimaryTint200) },
			"secondary-base": { background: ref(colorSecondary) },
			"secondary-50": { background: ref(colorSecondaryTint50) },
			"secondary-100": { background: ref(colorSecondaryTint100) },
			"secondary-150": { background: ref(colorSecondaryTint150) },
			"secondary-200": { background: ref(colorSecondaryTint200) },
			"success-base": { background: ref(colorSuccess) },
			"success-50": { background: ref(colorSuccessTint50) },
			"success-100": { background: ref(colorSuccessTint100) },
			"success-150": { background: ref(colorSuccessTint150) },
			"success-200": { background: ref(colorSuccessTint200) },
			"warning-base": { background: ref(colorWarning) },
			"warning-50": { background: ref(colorWarningTint50) },
			"warning-100": { background: ref(colorWarningTint100) },
			"warning-150": { background: ref(colorWarningTint150) },
			"warning-200": { background: ref(colorWarningTint200) },
			"danger-base": { background: ref(colorDanger) },
			"danger-50": { background: ref(colorDangerTint50) },
			"danger-100": { background: ref(colorDangerTint100) },
			"danger-150": { background: ref(colorDangerTint150) },
			"danger-200": { background: ref(colorDangerTint200) },
			"info-base": { background: ref(colorInfo) },
			"info-50": { background: ref(colorInfoTint50) },
			"info-100": { background: ref(colorInfoTint100) },
			"info-150": { background: ref(colorInfoTint150) },
			"info-200": { background: ref(colorInfoTint200) },
			"gray-base": { background: ref(colorGray) },
			"gray-50": { background: ref(colorGrayTint50) },
			"gray-100": { background: ref(colorGrayTint100) },
			"gray-150": { background: ref(colorGrayTint150) },
			"gray-200": { background: ref(colorGrayTint200) },
		},
	},
	defaultVariants: {
		variant: "primary-base",
	},
});

export default s;
