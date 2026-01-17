import { useSpacing, useUtilities } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const { spacingXs, spacingSm, spacingMd, spacingLg, spacingXl, spacing2xl } =
	useSpacing(s, {
		xs: "0.25rem",
		sm: "0.5rem",
		md: "1rem",
		lg: "1.5rem",
		xl: "2rem",
		"2xl": "3rem",
	});

// Register all utilities and generate utility classes
const { createPaddingUtility, createMarginUtility, createGapUtility } =
	useUtilities(s);

const spacingMap = {
	xs: s.ref(spacingXs),
	sm: s.ref(spacingSm),
	md: s.ref(spacingMd),
	lg: s.ref(spacingLg),
	xl: s.ref(spacingXl),
	"2xl": s.ref(spacing2xl),
};

createPaddingUtility(spacingMap);
createMarginUtility(spacingMap);
createGapUtility(spacingMap);

export const spacingPreview = s.recipe({
	name: "spacing-preview",
	base: {
		background: "#1E3A8A",
		borderRadius: "4px",
	},
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

s.selector(".spacing-swatch", {
	display: "flex",
	alignItems: "center",
	gap: "16px",
	padding: "12px 16px",
	borderRadius: "8px",
	background: "#f8fafc",
});

s.selector(".spacing-name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
	minWidth: "40px",
});

s.selector(".spacing-value", {
	fontSize: "14px",
	color: "#64748b",
	fontFamily: "monospace",
	minWidth: "60px",
});

s.selector(".spacing-grid", {
	display: "flex",
	flexDirection: "column",
	gap: "8px",
	padding: "16px",
});

export default s;
