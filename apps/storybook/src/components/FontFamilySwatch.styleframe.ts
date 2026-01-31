import { styleframe } from "styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
} from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

useUtilitiesPreset(s);

const { fontFamily } = useDesignTokensPreset(s);
const { fontFamilyBase, fontFamilyPrint, fontFamilyMono } = fontFamily;

const { swatchColorTertiary } = useSwatchColors(s);
const { swatchGapSm } = useSwatchSpacing(s);

s.selector(".font-family-swatch__preview", {
	color: s.ref(swatchColorTertiary),
	padding: s.ref(swatchGapSm),
});

export const fontFamilySwatch = s.recipe({
	name: "font-family-swatch",
	base: {},
	variants: {
		variant: {
			base: {
				fontFamily: s.ref(fontFamilyBase),
			},
			print: {
				fontFamily: s.ref(fontFamilyPrint),
			},
			mono: {
				fontFamily: s.ref(fontFamilyMono),
			},
		},
	},
	defaultVariants: {
		variant: "base",
	},
});

export default s;
