import { styleframe } from "virtual:styleframe";
import {
	useSwatchColors,
	useSwatchDimensions,
} from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

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

s.selector(".box-shadow-swatch__preview", {
	width: s.ref(swatchPreviewSize),
	height: s.ref(swatchPreviewSize),
	background: s.ref(swatchColorBackground),
	borderRadius: s.ref(swatchBorderRadiusSm),
});

export const boxShadowSwatch = s.recipe({
	name: "box-shadow-swatch",
	base: {},
	variants: {
		variant: {
			none: {
				boxShadow: s.ref(boxShadowNone),
			},
			xs: {
				boxShadow: s.ref(boxShadowXs),
			},
			sm: {
				boxShadow: s.ref(boxShadowSm),
			},
			md: {
				boxShadow: s.ref(boxShadowMd),
			},
			lg: {
				boxShadow: s.ref(boxShadowLg),
			},
			xl: {
				boxShadow: s.ref(boxShadowXl),
			},
			"2xl": {
				boxShadow: s.ref(boxShadow2xl),
			},
			inner: {
				boxShadow: s.ref(boxShadowInner),
			},
			ring: {
				boxShadow: s.ref(boxShadowRing),
			},
		},
	},
	defaultVariants: {
		variant: "md",
	},
});

export default s;
