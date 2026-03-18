import { styleframe } from "virtual:styleframe";
import { useSwatchColors, useSwatchDimensions } from "../../../theme/useSwatch";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

useUtilitiesPreset(s);

const { borderWidth } = useDesignTokensPreset(s);
const {
	borderWidthNone,
	borderWidthThin,
	borderWidthMedium,
	borderWidthThick,
} = borderWidth;

const { swatchColorPrimary, swatchColorBackground } = useSwatchColors(s);
const { swatchPreviewSize } = useSwatchDimensions(s);

selector(".border-width-swatch__preview", {
	width: ref(swatchPreviewSize),
	height: ref(swatchPreviewSize),
	background: ref(swatchColorBackground),
	borderColor: ref(swatchColorPrimary),
	borderStyle: "solid",
});

export const borderWidthSwatch = recipe({
	name: "border-width-swatch",
	base: {},
	variants: {
		variant: {
			none: {
				borderWidth: ref(borderWidthNone),
			},
			thin: {
				borderWidth: ref(borderWidthThin),
			},
			medium: {
				borderWidth: ref(borderWidthMedium),
			},
			thick: {
				borderWidth: ref(borderWidthThick),
			},
		},
	},
	defaultVariants: {
		variant: "thin",
	},
});

export default s;
