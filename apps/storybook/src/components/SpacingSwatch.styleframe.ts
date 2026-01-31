import { useSpacing } from "@styleframe/theme";
import { styleframe } from "styleframe";
import {
	useSwatchColors,
	useSwatchDimensions,
} from "./primitives/tokens.styleframe";

const s = styleframe();

const { swatchColorPrimary } = useSwatchColors(s);
const { swatchBorderRadiusSm } = useSwatchDimensions(s);

export const spacingValues = {
	xs: "0.25rem",
	sm: "0.5rem",
	md: "1rem",
	lg: "1.5rem",
	xl: "2rem",
	"2xl": "3rem",
} as const;

export const spacings = Object.keys(spacingValues) as Spacing[];

export type Spacing = keyof typeof spacingValues;

const { spacingXs, spacingSm, spacingMd, spacingLg, spacingXl, spacing2xl } =
	useSpacing(s, spacingValues);

s.selector(".spacing-swatch__preview", {
	background: s.ref(swatchColorPrimary),
	borderRadius: s.ref(swatchBorderRadiusSm),
});

export const spacingPreview = s.recipe({
	name: "spacing-preview",
	base: {},
	variants: {
		spacing: {
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
		},
	},
	defaultVariants: {
		spacing: "md",
	},
});

export default s;
