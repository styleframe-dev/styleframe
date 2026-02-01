import { styleframe } from "styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
} from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

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

s.selector(".line-height-swatch__preview", {
	color: s.ref(swatchColorTertiary),
	padding: s.ref(swatchGapSm),
	maxWidth: "400px",
});

export const lineHeightSwatch = s.recipe({
	name: "line-height-swatch",
	base: {},
	variants: {
		variant: {
			tight: {
				lineHeight: s.ref(lineHeightTight),
			},
			snug: {
				lineHeight: s.ref(lineHeightSnug),
			},
			normal: {
				lineHeight: s.ref(lineHeightNormal),
			},
			relaxed: {
				lineHeight: s.ref(lineHeightRelaxed),
			},
			loose: {
				lineHeight: s.ref(lineHeightLoose),
			},
		},
	},
	defaultVariants: {
		variant: "normal",
	},
});

export default s;
