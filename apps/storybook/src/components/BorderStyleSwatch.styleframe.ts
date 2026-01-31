import { styleframe } from "styleframe";
import {
	useSwatchColors,
	useSwatchDimensions,
} from "./primitives/tokens.styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

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

s.selector(".border-style-swatch__preview", {
	width: s.ref(swatchPreviewSize),
	height: s.ref(swatchPreviewSize),
	background: s.ref(swatchColorBackground),
	borderColor: s.ref(swatchColorPrimary),
	borderWidth: "3px",
});

export const borderStyleSwatch = s.recipe({
	name: "border-style-swatch",
	base: {},
	variants: {
		variant: {
			none: {
				borderStyle: s.ref(borderStyleNone),
			},
			solid: {
				borderStyle: s.ref(borderStyleSolid),
			},
			dashed: {
				borderStyle: s.ref(borderStyleDashed),
			},
			dotted: {
				borderStyle: s.ref(borderStyleDotted),
			},
			double: {
				borderStyle: s.ref(borderStyleDouble),
			},
			groove: {
				borderStyle: s.ref(borderStyleGroove),
			},
			inset: {
				borderStyle: s.ref(borderStyleInset),
			},
			outset: {
				borderStyle: s.ref(borderStyleOutset),
			},
		},
	},
	defaultVariants: {
		variant: "solid",
	},
});

export default s;
