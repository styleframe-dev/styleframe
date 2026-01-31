import { styleframe } from "styleframe";
import {
	useSwatchColors,
	useSwatchDimensions,
} from "./primitives/tokens.styleframe";
import { useDesignTokensPreset } from "@styleframe/theme";

const s = styleframe();

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

const { swatchColorPrimary, swatchColorBackground } = useSwatchColors(s);
const { swatchPreviewSize } = useSwatchDimensions(s);

s.selector(".border-radius-swatch__preview", {
	width: s.ref(swatchPreviewSize),
	height: s.ref(swatchPreviewSize),
	background: s.ref(swatchColorBackground),
	border: s.css`1px solid ${s.ref(swatchColorPrimary)}`,
});

export const borderRadiusSwatch = s.recipe({
	name: "border-radius-swatch",
	base: {},
	variants: {
		borderRadius: {
			none: {
				borderRadius: s.ref(borderRadiusNone),
			},
			sm: {
				borderRadius: s.ref(borderRadiusSm),
			},
			md: {
				borderRadius: s.ref(borderRadiusMd),
			},
			lg: {
				borderRadius: s.ref(borderRadiusLg),
			},
			xl: {
				borderRadius: s.ref(borderRadiusXl),
			},
			"2xl": {
				borderRadius: s.ref(borderRadius2xl),
			},
			full: {
				borderRadius: s.ref(borderRadiusFull),
			},
		},
	},
	defaultVariants: {
		borderRadius: "md",
	},
});

export default s;
