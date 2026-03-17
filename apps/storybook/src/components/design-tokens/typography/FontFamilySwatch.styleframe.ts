import { styleframe } from "virtual:styleframe";
import { useSwatchColors, useSwatchSpacing } from "../../../theme/useSwatch";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

useUtilitiesPreset(s);

const { fontFamily } = useDesignTokensPreset(s);
const { fontFamilyBase, fontFamilyPrint, fontFamilyMono } = fontFamily;

const { swatchColorTertiary } = useSwatchColors(s);
const { swatchGapSm } = useSwatchSpacing(s);

selector(".font-family-swatch__preview", {
	color: ref(swatchColorTertiary),
	padding: ref(swatchGapSm),
});

export const fontFamilySwatch = recipe({
	name: "font-family-swatch",
	base: {},
	variants: {
		variant: {
			base: {
				fontFamily: ref(fontFamilyBase),
			},
			print: {
				fontFamily: ref(fontFamilyPrint),
			},
			mono: {
				fontFamily: ref(fontFamilyMono),
			},
		},
	},
	defaultVariants: {
		variant: "base",
	},
});

export default s;
