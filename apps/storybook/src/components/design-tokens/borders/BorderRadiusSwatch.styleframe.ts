import { styleframe } from "virtual:styleframe";
import { useSwatchColors, useSwatchDimensions } from "../../../theme/useSwatch";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe, css } = s;

useUtilitiesPreset(s);

const { borderRadius } = useDesignTokensPreset(s);
const {
	borderRadiusNone,
	borderRadiusSm,
	borderRadiusMd,
	borderRadiusLg,
	borderRadiusXl,
	borderRadius2xl,
	borderRadiusFull,
} = borderRadius;

const { swatchColorBackground } = useSwatchColors(s);
const { swatchPreviewSize } = useSwatchDimensions(s);

selector(".border-radius-swatch__preview", {
	width: ref(swatchPreviewSize),
	height: ref(swatchPreviewSize),
	background: ref(swatchColorBackground),
	border: css`1px solid @color.primary`,
});

export const borderRadiusSwatch = recipe({
	name: "border-radius-swatch",
	base: {},
	variants: {
		variant: {
			none: {
				borderRadius: ref(borderRadiusNone),
			},
			sm: {
				borderRadius: ref(borderRadiusSm),
			},
			md: {
				borderRadius: ref(borderRadiusMd),
			},
			lg: {
				borderRadius: ref(borderRadiusLg),
			},
			xl: {
				borderRadius: ref(borderRadiusXl),
			},
			"2xl": {
				borderRadius: ref(borderRadius2xl),
			},
			full: {
				borderRadius: ref(borderRadiusFull),
			},
		},
	},
	defaultVariants: {
		variant: "md",
	},
});

export default s;
