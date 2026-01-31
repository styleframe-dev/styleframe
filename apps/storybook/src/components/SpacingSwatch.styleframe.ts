import { useSpacing } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

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

s.selector(".spacing-swatch", {
	display: "flex",
	alignItems: "center",
	gap: "16px",
	padding: "12px 16px",
	borderRadius: "8px",
	background: "#f8fafc",
});

s.selector(".spacing-swatch__name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
	minWidth: "40px",
});

s.selector(".spacing-swatch__value", {
	fontSize: "14px",
	color: "#64748b",
	fontFamily: "monospace",
	minWidth: "60px",
});

s.selector(".spacing-swatch__preview", {
	background: "#1E3A8A",
	borderRadius: "4px",
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
