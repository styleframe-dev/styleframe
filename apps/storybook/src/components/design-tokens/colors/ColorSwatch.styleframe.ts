import { styleframe } from "virtual:styleframe";
import {
	useBodyElement,
	useDesignTokensPreset,
	useUtilitiesPreset,
} from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

useUtilitiesPreset(s);

const { colors } = useDesignTokensPreset(s);
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
} = colors;

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

export const colorSwatch = recipe({
	name: "color-swatch",
	base: {
		color: ref(colorBlack),
	},
	variants: {
		variant: {
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
			danger: {
				background: ref(colorDanger),
			},
			info: {
				background: ref(colorInfo),
			},
			white: {
				background: ref(colorWhite),
			},
			black: {
				color: ref(colorWhite),
				background: ref(colorBlack),
			},
			gray: {
				background: ref(colorGray),
			},
			background: {
				background: ref(colorBackground),
			},
			surface: {
				background: ref(colorSurface),
			},
			text: {
				color: ref(colorText),
				background: ref(bodyBackground),
			},
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
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

export default s;
