import { styleframe } from "styleframe";
import {
	useSwatchColors,
	useSwatchDimensions,
} from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

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

s.selector(".border-width-swatch__preview", {
	width: s.ref(swatchPreviewSize),
	height: s.ref(swatchPreviewSize),
	background: s.ref(swatchColorBackground),
	borderColor: s.ref(swatchColorPrimary),
	borderStyle: "solid",
});

export const borderWidthSwatch = s.recipe({
	name: "border-width-swatch",
	base: {},
	variants: {
		variant: {
			none: {
				borderWidth: s.ref(borderWidthNone),
			},
			thin: {
				borderWidth: s.ref(borderWidthThin),
			},
			medium: {
				borderWidth: s.ref(borderWidthMedium),
			},
			thick: {
				borderWidth: s.ref(borderWidthThick),
			},
		},
	},
	defaultVariants: {
		variant: "thin",
	},
});

export default s;
