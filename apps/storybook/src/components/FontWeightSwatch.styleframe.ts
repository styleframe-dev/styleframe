import { styleframe } from "virtual:styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
} from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

useUtilitiesPreset(s);

const { fontWeight } = useDesignTokensPreset(s);
const {
	fontWeightExtralight,
	fontWeightLight,
	fontWeightNormal,
	fontWeightMedium,
	fontWeightSemibold,
	fontWeightBold,
	fontWeightBlack,
} = fontWeight;

const { swatchColorTertiary } = useSwatchColors(s);
const { swatchGapSm } = useSwatchSpacing(s);

s.selector(".font-weight-swatch__preview", {
	color: s.ref(swatchColorTertiary),
	padding: s.ref(swatchGapSm),
});

export const fontWeightSwatch = s.recipe({
	name: "font-weight-swatch",
	base: {},
	variants: {
		variant: {
			extralight: {
				fontWeight: s.ref(fontWeightExtralight),
			},
			light: {
				fontWeight: s.ref(fontWeightLight),
			},
			normal: {
				fontWeight: s.ref(fontWeightNormal),
			},
			medium: {
				fontWeight: s.ref(fontWeightMedium),
			},
			semibold: {
				fontWeight: s.ref(fontWeightSemibold),
			},
			bold: {
				fontWeight: s.ref(fontWeightBold),
			},
			black: {
				fontWeight: s.ref(fontWeightBlack),
			},
		},
	},
	defaultVariants: {
		variant: "normal",
	},
});

export default s;
