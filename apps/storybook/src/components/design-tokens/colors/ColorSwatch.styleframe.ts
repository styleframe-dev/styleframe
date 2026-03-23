import { styleframe } from "virtual:styleframe";
import {
	useBodyElement,
	useDesignTokensPreset,
	useUtilitiesPreset,
} from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

useUtilitiesPreset(s);

const {
	colorPrimary,
	colorSecondary,
	colorSuccess,
	colorWarning,
	colorDanger,
	colorInfo,
	colorBlack,
	colorWhite,
	colorGray,
	colorBackground,
	colorSurface,
	colorText,
	colorTextWeak,
	colorTextWeaker,
	colorTextWeakest,
	colorTextInverted,
	colorPrimaryTint50,
	colorPrimaryTint100,
	colorPrimaryTint150,
	colorPrimaryTint200,
	colorSecondaryTint50,
	colorSecondaryTint100,
	colorSecondaryTint150,
	colorSecondaryTint200,
	colorSuccessTint50,
	colorSuccessTint100,
	colorSuccessTint150,
	colorSuccessTint200,
	colorWarningTint50,
	colorWarningTint100,
	colorWarningTint150,
	colorWarningTint200,
	colorDangerTint50,
	colorDangerTint100,
	colorDangerTint150,
	colorDangerTint200,
	colorInfoTint50,
	colorInfoTint100,
	colorInfoTint150,
	colorInfoTint200,
	colorGrayTint50,
	colorGrayTint100,
	colorGrayTint150,
	colorGrayTint200,
	colorPrimaryShade50,
	colorPrimaryShade100,
	colorPrimaryShade150,
	colorPrimaryShade200,
	colorSecondaryShade50,
	colorSecondaryShade100,
	colorSecondaryShade150,
	colorSecondaryShade200,
	colorSuccessShade50,
	colorSuccessShade100,
	colorSuccessShade150,
	colorSuccessShade200,
	colorWarningShade50,
	colorWarningShade100,
	colorWarningShade150,
	colorWarningShade200,
	colorDangerShade50,
	colorDangerShade100,
	colorDangerShade150,
	colorDangerShade200,
	colorInfoShade50,
	colorInfoShade100,
	colorInfoShade150,
	colorInfoShade200,
	colorGrayShade50,
	colorGrayShade100,
	colorGrayShade150,
	colorGrayShade200,
	colorPrimaryHover,
	colorPrimaryFocus,
	colorPrimaryActive,
	colorSecondaryHover,
	colorSecondaryFocus,
	colorSecondaryActive,
	colorSuccessHover,
	colorSuccessFocus,
	colorSuccessActive,
	colorWarningHover,
	colorWarningFocus,
	colorWarningActive,
	colorDangerHover,
	colorDangerFocus,
	colorDangerActive,
	colorInfoHover,
	colorInfoFocus,
	colorInfoActive,
	colorGrayHover,
	colorGrayFocus,
	colorGrayActive,
} = useDesignTokensPreset(s, {
	meta: { merge: true },
});

const { bodyBackground } = useBodyElement(s);

selector(".color-swatch__checks", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.2xs",
	fontSize: "11px",
});

selector(".color-swatch__check", {
	display: "flex",
	alignItems: "center",
	gap: "@spacing.xs",
	whiteSpace: "nowrap",
});

selector(".color-swatch__check-label", {
	width: "52px",
	flexShrink: "0",
});

selector(".color-swatch__check-ratio", {
	width: "44px",
	flexShrink: "0",
	textAlign: "right",
});

selector(".color-swatch__check-badge", {
	width: "36px",
	flexShrink: "0",
	textAlign: "right",
	fontWeight: "@font-weight.semibold",
});

selector(".color-swatch__preview", {
	width: "calc(@spacing * 6)",
	height: "calc(@spacing * 6)",
	borderRadius: "@border-radius.lg",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "12px",
	fontWeight: "@font-weight.semibold",
});

selector(".color-swatch__name", {
	fontFamily: "monospace",
	fontSize: "11px",
	marginBottom: "@spacing.2xs",
});

export const colorSwatch = recipe({
	name: "color-swatch",
	variants: {
		interactive: {
			true: {
				cursor: "pointer",
				transition: "background-color 150ms ease",
			},
			false: {},
		},
		variant: {
			// Base colors
			primary: {
				background: ref(colorPrimary),
			},
			secondary: {
				background: ref(colorSecondary),
			},
			success: {
				background: ref(colorSuccess),
			},
			warning: {
				background: ref(colorWarning),
			},
			danger: { background: ref(colorDanger) },
			info: { background: ref(colorInfo) },
			white: { color: ref(colorBlack), background: ref(colorWhite) },
			black: { color: ref(colorWhite), background: ref(colorBlack) },
			gray: { background: ref(colorGray) },
			background: { background: ref(colorBackground) },
			surface: { background: ref(colorSurface) },
			text: { color: ref(colorText), background: ref(bodyBackground) },
			"text-weak": {
				color: ref(colorTextWeak),
				background: ref(bodyBackground),
			},
			"text-weaker": {
				color: ref(colorTextWeaker),
				background: ref(bodyBackground),
			},
			"text-weakest": {
				color: ref(colorTextWeakest),
				background: ref(bodyBackground),
			},
			"text-inverted": {
				color: ref(colorTextInverted),
				background: ref(bodyBackground),
			},

			// Tint variants
			"primary-tint-base": {
				background: ref(colorPrimary),
			},
			"primary-tint-50": {
				background: ref(colorPrimaryTint50),
			},
			"primary-tint-100": {
				background: ref(colorPrimaryTint100),
			},
			"primary-tint-150": {
				background: ref(colorPrimaryTint150),
			},
			"primary-tint-200": {
				background: ref(colorPrimaryTint200),
			},
			"secondary-tint-base": {
				background: ref(colorSecondary),
			},
			"secondary-tint-50": {
				background: ref(colorSecondaryTint50),
			},
			"secondary-tint-100": {
				background: ref(colorSecondaryTint100),
			},
			"secondary-tint-150": {
				background: ref(colorSecondaryTint150),
			},
			"secondary-tint-200": {
				background: ref(colorSecondaryTint200),
			},
			"success-tint-base": {
				background: ref(colorSuccess),
			},
			"success-tint-50": {
				background: ref(colorSuccessTint50),
			},
			"success-tint-100": {
				background: ref(colorSuccessTint100),
			},
			"success-tint-150": {
				background: ref(colorSuccessTint150),
			},
			"success-tint-200": {
				background: ref(colorSuccessTint200),
			},
			"warning-tint-base": {
				background: ref(colorWarning),
			},
			"warning-tint-50": {
				background: ref(colorWarningTint50),
			},
			"warning-tint-100": {
				background: ref(colorWarningTint100),
			},
			"warning-tint-150": {
				background: ref(colorWarningTint150),
			},
			"warning-tint-200": {
				background: ref(colorWarningTint200),
			},
			"danger-tint-base": {
				background: ref(colorDanger),
			},
			"danger-tint-50": {
				background: ref(colorDangerTint50),
			},
			"danger-tint-100": {
				background: ref(colorDangerTint100),
			},
			"danger-tint-150": {
				background: ref(colorDangerTint150),
			},
			"danger-tint-200": {
				background: ref(colorDangerTint200),
			},
			"info-tint-base": {
				background: ref(colorInfo),
			},
			"info-tint-50": {
				background: ref(colorInfoTint50),
			},
			"info-tint-100": {
				background: ref(colorInfoTint100),
			},
			"info-tint-150": {
				background: ref(colorInfoTint150),
			},
			"info-tint-200": {
				background: ref(colorInfoTint200),
			},
			"gray-tint-base": {
				background: ref(colorGray),
			},
			"gray-tint-50": {
				background: ref(colorGrayTint50),
			},
			"gray-tint-100": {
				background: ref(colorGrayTint100),
			},
			"gray-tint-150": {
				background: ref(colorGrayTint150),
			},
			"gray-tint-200": {
				background: ref(colorGrayTint200),
			},

			// Shade variants
			"primary-shade-base": {
				background: ref(colorPrimary),
			},
			"primary-shade-50": {
				background: ref(colorPrimaryShade50),
			},
			"primary-shade-100": {
				background: ref(colorPrimaryShade100),
			},
			"primary-shade-150": {
				background: ref(colorPrimaryShade150),
			},
			"primary-shade-200": {
				background: ref(colorPrimaryShade200),
			},
			"secondary-shade-base": {
				background: ref(colorSecondary),
			},
			"secondary-shade-50": {
				background: ref(colorSecondaryShade50),
			},
			"secondary-shade-100": {
				background: ref(colorSecondaryShade100),
			},
			"secondary-shade-150": {
				background: ref(colorSecondaryShade150),
			},
			"secondary-shade-200": {
				background: ref(colorSecondaryShade200),
			},
			"success-shade-base": {
				background: ref(colorSuccess),
			},
			"success-shade-50": {
				background: ref(colorSuccessShade50),
			},
			"success-shade-100": {
				background: ref(colorSuccessShade100),
			},
			"success-shade-150": {
				background: ref(colorSuccessShade150),
			},
			"success-shade-200": {
				background: ref(colorSuccessShade200),
			},
			"warning-shade-base": {
				background: ref(colorWarning),
			},
			"warning-shade-50": {
				background: ref(colorWarningShade50),
			},
			"warning-shade-100": {
				background: ref(colorWarningShade100),
			},
			"warning-shade-150": {
				background: ref(colorWarningShade150),
			},
			"warning-shade-200": {
				background: ref(colorWarningShade200),
			},
			"danger-shade-base": {
				background: ref(colorDanger),
			},
			"danger-shade-50": {
				background: ref(colorDangerShade50),
			},
			"danger-shade-100": {
				background: ref(colorDangerShade100),
			},
			"danger-shade-150": {
				background: ref(colorDangerShade150),
			},
			"danger-shade-200": {
				background: ref(colorDangerShade200),
			},
			"info-shade-base": {
				background: ref(colorInfo),
			},
			"info-shade-50": {
				background: ref(colorInfoShade50),
			},
			"info-shade-100": {
				background: ref(colorInfoShade100),
			},
			"info-shade-150": {
				background: ref(colorInfoShade150),
			},
			"info-shade-200": {
				background: ref(colorInfoShade200),
			},
			"gray-shade-base": {
				background: ref(colorGray),
			},
			"gray-shade-50": {
				background: ref(colorGrayShade50),
			},
			"gray-shade-100": {
				background: ref(colorGrayShade100),
			},
			"gray-shade-150": {
				background: ref(colorGrayShade150),
			},
			"gray-shade-200": {
				background: ref(colorGrayShade200),
			},

			// Interactive variants
			"primary-interactive": {
				background: ref(colorPrimary),
				"&:hover": { background: ref(colorPrimaryHover) },
				"&:focus-visible": { background: ref(colorPrimaryFocus) },
				"&:active": { background: ref(colorPrimaryActive) },
			},
			"secondary-interactive": {
				background: ref(colorSecondary),
				"&:hover": { background: ref(colorSecondaryHover) },
				"&:focus-visible": { background: ref(colorSecondaryFocus) },
				"&:active": { background: ref(colorSecondaryActive) },
			},
			"success-interactive": {
				background: ref(colorSuccess),
				"&:hover": { background: ref(colorSuccessHover) },
				"&:focus-visible": { background: ref(colorSuccessFocus) },
				"&:active": { background: ref(colorSuccessActive) },
			},
			"warning-interactive": {
				background: ref(colorWarning),
				"&:hover": { background: ref(colorWarningHover) },
				"&:focus-visible": { background: ref(colorWarningFocus) },
				"&:active": { background: ref(colorWarningActive) },
			},
			"danger-interactive": {
				background: ref(colorDanger),
				"&:hover": { background: ref(colorDangerHover) },
				"&:focus-visible": { background: ref(colorDangerFocus) },
				"&:active": { background: ref(colorDangerActive) },
			},
			"info-interactive": {
				background: ref(colorInfo),
				"&:hover": { background: ref(colorInfoHover) },
				"&:focus-visible": { background: ref(colorInfoFocus) },
				"&:active": { background: ref(colorInfoActive) },
			},
			"gray-interactive": {
				background: ref(colorGray),
				"&:hover": { background: ref(colorGrayHover) },
				"&:focus-visible": { background: ref(colorGrayFocus) },
				"&:active": { background: ref(colorGrayActive) },
			},
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

export default s;
