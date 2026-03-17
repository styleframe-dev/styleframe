import { styleframe } from "virtual:styleframe";
import { useSwatchColors, useSwatchSpacing } from "../../../theme/useSwatch";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

useUtilitiesPreset(s);

const { letterSpacing } = useDesignTokensPreset(s);
const {
	letterSpacingTighter,
	letterSpacingTight,
	letterSpacingNormal,
	letterSpacingWide,
	letterSpacingWider,
} = letterSpacing;

const { swatchColorTertiary } = useSwatchColors(s);
const { swatchGapSm } = useSwatchSpacing(s);

selector(".letter-spacing-swatch__preview", {
	color: ref(swatchColorTertiary),
	padding: ref(swatchGapSm),
});

export const letterSpacingSwatch = recipe({
	name: "letter-spacing-swatch",
	base: {},
	variants: {
		variant: {
			tighter: {
				letterSpacing: ref(letterSpacingTighter),
			},
			tight: {
				letterSpacing: ref(letterSpacingTight),
			},
			normal: {
				letterSpacing: ref(letterSpacingNormal),
			},
			wide: {
				letterSpacing: ref(letterSpacingWide),
			},
			wider: {
				letterSpacing: ref(letterSpacingWider),
			},
		},
	},
	defaultVariants: {
		variant: "normal",
	},
});

export default s;
