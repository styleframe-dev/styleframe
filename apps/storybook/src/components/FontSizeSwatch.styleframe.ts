import { styleframe } from "virtual:styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
	useSwatchDimensions,
} from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

useUtilitiesPreset(s);

const { fontSize } = useDesignTokensPreset(s);
const {
	fontSizeXs,
	fontSizeSm,
	fontSizeMd,
	fontSizeLg,
	fontSizeXl,
	fontSize2xl,
	fontSize3xl,
	fontSize4xl,
} = fontSize;

const { swatchColorTertiary } = useSwatchColors(s);
const { swatchGapSm } = useSwatchSpacing(s);
const { swatchBorderRadius } = useSwatchDimensions(s);

s.selector(".font-size-swatch__preview", {
	color: s.ref(swatchColorTertiary),
	padding: s.ref(swatchGapSm),
});

export const fontSizeSwatch = s.recipe({
	name: "font-size-swatch",
	base: {},
	variants: {
		variant: {
			xs: {
				fontSize: s.ref(fontSizeXs),
			},
			sm: {
				fontSize: s.ref(fontSizeSm),
			},
			md: {
				fontSize: s.ref(fontSizeMd),
			},
			lg: {
				fontSize: s.ref(fontSizeLg),
			},
			xl: {
				fontSize: s.ref(fontSizeXl),
			},
			"2xl": {
				fontSize: s.ref(fontSize2xl),
			},
			"3xl": {
				fontSize: s.ref(fontSize3xl),
			},
			"4xl": {
				fontSize: s.ref(fontSize4xl),
			},
		},
	},
	defaultVariants: {
		variant: "md",
	},
});

export default s;
