import { styleframe } from "virtual:styleframe";
import { useSwatchColors, useSwatchDimensions } from "../../../theme/useSwatch";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();
const { ref, selector, recipe } = s;

useUtilitiesPreset(s);

const { borderStyle } = useDesignTokensPreset(s);
const {
	borderStyleNone,
	borderStyleSolid,
	borderStyleDashed,
	borderStyleDotted,
	borderStyleDouble,
	borderStyleGroove,
	borderStyleInset,
	borderStyleOutset,
} = borderStyle;

const { swatchColorPrimary, swatchColorBackground } = useSwatchColors(s);
const { swatchPreviewSize } = useSwatchDimensions(s);

selector(".border-style-swatch__preview", {
	width: ref(swatchPreviewSize),
	height: ref(swatchPreviewSize),
	background: ref(swatchColorBackground),
	borderColor: ref(swatchColorPrimary),
	borderWidth: "3px",
});

export const borderStyleSwatch = recipe({
	name: "border-style-swatch",
	base: {},
	variants: {
		variant: {
			none: {
				borderStyle: ref(borderStyleNone),
			},
			solid: {
				borderStyle: ref(borderStyleSolid),
			},
			dashed: {
				borderStyle: ref(borderStyleDashed),
			},
			dotted: {
				borderStyle: ref(borderStyleDotted),
			},
			double: {
				borderStyle: ref(borderStyleDouble),
			},
			groove: {
				borderStyle: ref(borderStyleGroove),
			},
			inset: {
				borderStyle: ref(borderStyleInset),
			},
			outset: {
				borderStyle: ref(borderStyleOutset),
			},
		},
	},
	defaultVariants: {
		variant: "solid",
	},
});

export default s;
