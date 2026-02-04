import { styleframe } from "virtual:styleframe";
import {
	useSwatchColors,
	useSwatchDimensions,
} from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

useUtilitiesPreset(s);

const { spacing } = useDesignTokensPreset(s);
const {
	spacing2xs,
	spacingXs,
	spacingSm,
	spacingMd,
	spacingLg,
	spacingXl,
	spacing2xl,
	spacing3xl,
} = spacing;

const { swatchColorPrimary } = useSwatchColors(s);
const { swatchBorderRadiusSm } = useSwatchDimensions(s);

s.selector(".spacing-swatch__preview", {
	background: s.ref(swatchColorPrimary),
	borderRadius: s.ref(swatchBorderRadiusSm),
});

export const spacingSwatch = s.recipe({
	name: "spacing-swatch",
	base: {},
	variants: {
		variant: {
			"2xs": {
				width: s.ref(spacing2xs),
				height: s.ref(spacing2xs),
			},
			xs: {
				width: s.ref(spacingXs),
				height: s.ref(spacingXs),
			},
			sm: {
				width: s.ref(spacingSm),
				height: s.ref(spacingSm),
			},
			md: {
				width: s.ref(spacingMd),
				height: s.ref(spacingMd),
			},
			lg: {
				width: s.ref(spacingLg),
				height: s.ref(spacingLg),
			},
			xl: {
				width: s.ref(spacingXl),
				height: s.ref(spacingXl),
			},
			"2xl": {
				width: s.ref(spacing2xl),
				height: s.ref(spacing2xl),
			},
			"3xl": {
				width: s.ref(spacing3xl),
				height: s.ref(spacing3xl),
			},
		},
	},
	defaultVariants: {
		variant: "md",
	},
});

export default s;
