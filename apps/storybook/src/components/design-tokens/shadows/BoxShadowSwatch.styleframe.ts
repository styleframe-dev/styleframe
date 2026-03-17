import { styleframe } from "virtual:styleframe";
import { useSwatchColors, useSwatchDimensions } from "../../../theme/useSwatch";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

useUtilitiesPreset(s);

const { boxShadow } = useDesignTokensPreset(s);
const {
	boxShadowNone,
	boxShadowXs,
	boxShadowSm,
	boxShadowMd,
	boxShadowLg,
	boxShadowXl,
	boxShadow2xl,
	boxShadowInner,
	boxShadowRing,
} = boxShadow;

const { swatchColorBackground } = useSwatchColors(s);
const { swatchPreviewSize, swatchBorderRadiusSm } = useSwatchDimensions(s);

selector(".box-shadow-swatch__preview", {
	width: ref(swatchPreviewSize),
	height: ref(swatchPreviewSize),
	background: ref(swatchColorBackground),
	borderRadius: ref(swatchBorderRadiusSm),
});

export const boxShadowSwatch = recipe({
	name: "box-shadow-swatch",
	base: {},
	variants: {
		variant: {
			none: {
				boxShadow: ref(boxShadowNone),
			},
			xs: {
				boxShadow: ref(boxShadowXs),
			},
			sm: {
				boxShadow: ref(boxShadowSm),
			},
			md: {
				boxShadow: ref(boxShadowMd),
			},
			lg: {
				boxShadow: ref(boxShadowLg),
			},
			xl: {
				boxShadow: ref(boxShadowXl),
			},
			"2xl": {
				boxShadow: ref(boxShadow2xl),
			},
			inner: {
				boxShadow: ref(boxShadowInner),
			},
			ring: {
				boxShadow: ref(boxShadowRing),
			},
		},
	},
	defaultVariants: {
		variant: "md",
	},
});

export default s;
