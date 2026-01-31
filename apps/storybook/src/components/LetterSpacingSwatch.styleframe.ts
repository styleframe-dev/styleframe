import { styleframe } from "styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
} from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

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

s.selector(".letter-spacing-swatch__preview", {
	color: s.ref(swatchColorTertiary),
	padding: s.ref(swatchGapSm),
});

export const letterSpacingSwatch = s.recipe({
	name: "letter-spacing-swatch",
	base: {},
	variants: {
		variant: {
			tighter: {
				letterSpacing: s.ref(letterSpacingTighter),
			},
			tight: {
				letterSpacing: s.ref(letterSpacingTight),
			},
			normal: {
				letterSpacing: s.ref(letterSpacingNormal),
			},
			wide: {
				letterSpacing: s.ref(letterSpacingWide),
			},
			wider: {
				letterSpacing: s.ref(letterSpacingWider),
			},
		},
	},
	defaultVariants: {
		variant: "normal",
	},
});

export default s;
