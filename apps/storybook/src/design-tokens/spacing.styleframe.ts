import { spacingValues as defaultSpacingValues } from "@styleframe/theme";
import { styleframe } from "styleframe";
import { spacing } from "../tokens.styleframe";

const s = styleframe();

// Re-export default values for display in stories
export const spacingValues = defaultSpacingValues;

export const spacingPreview = s.recipe({
	name: "spacing-preview",
	base: {},
	variants: {
		spacing: {
			"2xs": {
				width: s.ref(spacing.spacing2xs),
				height: s.ref(spacing.spacing2xs),
			},
			xs: {
				width: s.ref(spacing.spacingXs),
				height: s.ref(spacing.spacingXs),
			},
			sm: {
				width: s.ref(spacing.spacingSm),
				height: s.ref(spacing.spacingSm),
			},
			md: {
				width: s.ref(spacing.spacingMd),
				height: s.ref(spacing.spacingMd),
			},
			lg: {
				width: s.ref(spacing.spacingLg),
				height: s.ref(spacing.spacingLg),
			},
			xl: {
				width: s.ref(spacing.spacingXl),
				height: s.ref(spacing.spacingXl),
			},
			"2xl": {
				width: s.ref(spacing.spacing2xl),
				height: s.ref(spacing.spacing2xl),
			},
			"3xl": {
				width: s.ref(spacing.spacing3xl),
				height: s.ref(spacing.spacing3xl),
			},
		},
	},
	defaultVariants: {
		spacing: "md",
	},
});

export default s;
