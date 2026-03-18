import { styleframe } from "virtual:styleframe";
import { useSwatchColors, useSwatchSpacing } from "../../../theme/useSwatch";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

useUtilitiesPreset(s);

const { lineHeight } = useDesignTokensPreset(s);
const {
	lineHeightTight,
	lineHeightSnug,
	lineHeightNormal,
	lineHeightRelaxed,
	lineHeightLoose,
} = lineHeight;

const { swatchColorTertiary } = useSwatchColors(s);
const { swatchGapSm } = useSwatchSpacing(s);

selector(".line-height-swatch__preview", {
	color: ref(swatchColorTertiary),
	padding: ref(swatchGapSm),
	maxWidth: "400px",
});

export const lineHeightSwatch = recipe({
	name: "line-height-swatch",
	base: {},
	variants: {
		variant: {
			tight: {
				lineHeight: ref(lineHeightTight),
			},
			snug: {
				lineHeight: ref(lineHeightSnug),
			},
			normal: {
				lineHeight: ref(lineHeightNormal),
			},
			relaxed: {
				lineHeight: ref(lineHeightRelaxed),
			},
			loose: {
				lineHeight: ref(lineHeightLoose),
			},
		},
	},
	defaultVariants: {
		variant: "normal",
	},
});

export default s;
