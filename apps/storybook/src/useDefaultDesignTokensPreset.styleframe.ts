import { useDefaultDesignTokensPreset, useUtilities } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

// Use the preset with all defaults
const tokens = useDefaultDesignTokensPreset(s);

// Register utilities for generated tokens
const {
	createPaddingUtility,
	createMarginUtility,
	createGapUtility,
	createBorderWidthUtility,
	createBorderRadiusUtility,
	createBoxShadowUtility,
	createFontFamilyUtility,
	createFontSizeUtility,
	createFontWeightUtility,
	createLineHeightUtility,
	createBackgroundUtility,
	createColorUtility,
} = useUtilities(s);

// Create spacing utilities
const spacingMap = {
	"2xs": s.ref(tokens.spacing!.spacing2xs),
	xs: s.ref(tokens.spacing!.spacingXs),
	sm: s.ref(tokens.spacing!.spacingSm),
	md: s.ref(tokens.spacing!.spacingMd),
	lg: s.ref(tokens.spacing!.spacingLg),
	xl: s.ref(tokens.spacing!.spacingXl),
	"2xl": s.ref(tokens.spacing!.spacing2xl),
	"3xl": s.ref(tokens.spacing!.spacing3xl),
};
createPaddingUtility(spacingMap);
createMarginUtility(spacingMap);
createGapUtility(spacingMap);

// Create border utilities
createBorderWidthUtility({
	none: s.ref(tokens.borderWidth!.borderWidthNone),
	thin: s.ref(tokens.borderWidth!.borderWidthThin),
	medium: s.ref(tokens.borderWidth!.borderWidthMedium),
	thick: s.ref(tokens.borderWidth!.borderWidthThick),
});

createBorderRadiusUtility({
	none: s.ref(tokens.borderRadius!.borderRadiusNone),
	sm: s.ref(tokens.borderRadius!.borderRadiusSm),
	md: s.ref(tokens.borderRadius!.borderRadiusMd),
	lg: s.ref(tokens.borderRadius!.borderRadiusLg),
	xl: s.ref(tokens.borderRadius!.borderRadiusXl),
	"2xl": s.ref(tokens.borderRadius!.borderRadius2xl),
	full: s.ref(tokens.borderRadius!.borderRadiusFull),
});

// Create box shadow utilities
createBoxShadowUtility({
	none: s.ref(tokens.boxShadow!.boxShadowNone),
	sm: s.ref(tokens.boxShadow!.boxShadowSm),
	md: s.ref(tokens.boxShadow!.boxShadowMd),
	lg: s.ref(tokens.boxShadow!.boxShadowLg),
	xl: s.ref(tokens.boxShadow!.boxShadowXl),
	"2xl": s.ref(tokens.boxShadow!.boxShadow2xl),
});

// Create typography utilities
createFontFamilyUtility({
	base: s.ref(tokens.fontFamily!.fontFamilyBase),
	print: s.ref(tokens.fontFamily!.fontFamilyPrint),
	mono: s.ref(tokens.fontFamily!.fontFamilyMono),
});

createFontSizeUtility({
	"2xs": s.ref(tokens.fontSize!.fontSize2xs),
	xs: s.ref(tokens.fontSize!.fontSizeXs),
	sm: s.ref(tokens.fontSize!.fontSizeSm),
	md: s.ref(tokens.fontSize!.fontSizeMd),
	lg: s.ref(tokens.fontSize!.fontSizeLg),
	xl: s.ref(tokens.fontSize!.fontSizeXl),
	"2xl": s.ref(tokens.fontSize!.fontSize2xl),
	"3xl": s.ref(tokens.fontSize!.fontSize3xl),
	"4xl": s.ref(tokens.fontSize!.fontSize4xl),
	"5xl": s.ref(tokens.fontSize!.fontSize5xl),
});

createFontWeightUtility({
	thin: s.ref(tokens.fontWeight!.fontWeightThin),
	extralight: s.ref(tokens.fontWeight!.fontWeightExtralight),
	light: s.ref(tokens.fontWeight!.fontWeightLight),
	normal: s.ref(tokens.fontWeight!.fontWeightNormal),
	medium: s.ref(tokens.fontWeight!.fontWeightMedium),
	semibold: s.ref(tokens.fontWeight!.fontWeightSemibold),
	bold: s.ref(tokens.fontWeight!.fontWeightBold),
	extrabold: s.ref(tokens.fontWeight!.fontWeightExtrabold),
	black: s.ref(tokens.fontWeight!.fontWeightBlack),
});

createLineHeightUtility({
	none: s.ref(tokens.lineHeight!.lineHeightNone),
	tight: s.ref(tokens.lineHeight!.lineHeightTight),
	snug: s.ref(tokens.lineHeight!.lineHeightSnug),
	normal: s.ref(tokens.lineHeight!.lineHeightNormal),
	relaxed: s.ref(tokens.lineHeight!.lineHeightRelaxed),
	loose: s.ref(tokens.lineHeight!.lineHeightLoose),
});

// Create color utilities
const colorMap = {
	primary: s.ref(tokens.colors!.colorPrimary),
	secondary: s.ref(tokens.colors!.colorSecondary),
	success: s.ref(tokens.colors!.colorSuccess),
	warning: s.ref(tokens.colors!.colorWarning),
	danger: s.ref(tokens.colors!.colorDanger),
	info: s.ref(tokens.colors!.colorInfo),
	light: s.ref(tokens.colors!.colorLight),
	dark: s.ref(tokens.colors!.colorDark),
};
createBackgroundUtility(colorMap);
createColorUtility(colorMap);

// Export token categories for use in stories
export const colorTokens = [
	"primary",
	"secondary",
	"success",
	"warning",
	"danger",
	"info",
	"light",
	"dark",
] as const;

export const spacingTokens = [
	"2xs",
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
	"2xl",
	"3xl",
] as const;

export const borderWidthTokens = ["none", "thin", "medium", "thick"] as const;

export const borderRadiusTokens = [
	"none",
	"sm",
	"md",
	"lg",
	"xl",
	"2xl",
	"full",
] as const;

export const boxShadowTokens = ["none", "sm", "md", "lg", "xl", "2xl"] as const;

export const fontFamilyTokens = ["base", "print", "mono"] as const;

export const fontSizeTokens = [
	"2xs",
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
	"2xl",
	"3xl",
	"4xl",
	"5xl",
] as const;

export const fontWeightTokens = [
	"thin",
	"extralight",
	"light",
	"normal",
	"medium",
	"semibold",
	"bold",
	"extrabold",
	"black",
] as const;

export const lineHeightTokens = [
	"none",
	"tight",
	"snug",
	"normal",
	"relaxed",
	"loose",
] as const;

export const easingTokens = [
	"linear",
	"ease-in",
	"ease-out",
	"ease-in-out",
] as const;

// Color preview recipe
export const colorPreview = s.recipe({
	name: "preset-color-preview",
	base: {
		width: "80px",
		height: "80px",
		borderRadius: "8px",
	},
	variants: {
		color: {
			primary: { background: s.ref(tokens.colors!.colorPrimary) },
			secondary: { background: s.ref(tokens.colors!.colorSecondary) },
			success: { background: s.ref(tokens.colors!.colorSuccess) },
			warning: { background: s.ref(tokens.colors!.colorWarning) },
			danger: { background: s.ref(tokens.colors!.colorDanger) },
			info: { background: s.ref(tokens.colors!.colorInfo) },
			light: {
				background: s.ref(tokens.colors!.colorLight),
				border: "1px solid #e2e8f0",
			},
			dark: { background: s.ref(tokens.colors!.colorDark) },
		},
	},
	defaultVariants: { color: "primary" },
});

// Spacing preview recipe
export const spacingPreview = s.recipe({
	name: "preset-spacing-preview",
	base: {
		background: "#3b82f6",
		borderRadius: "4px",
	},
	variants: {
		spacing: {
			"2xs": {
				width: s.ref(tokens.spacing!.spacing2xs),
				height: s.ref(tokens.spacing!.spacing2xs),
			},
			xs: {
				width: s.ref(tokens.spacing!.spacingXs),
				height: s.ref(tokens.spacing!.spacingXs),
			},
			sm: {
				width: s.ref(tokens.spacing!.spacingSm),
				height: s.ref(tokens.spacing!.spacingSm),
			},
			md: {
				width: s.ref(tokens.spacing!.spacingMd),
				height: s.ref(tokens.spacing!.spacingMd),
			},
			lg: {
				width: s.ref(tokens.spacing!.spacingLg),
				height: s.ref(tokens.spacing!.spacingLg),
			},
			xl: {
				width: s.ref(tokens.spacing!.spacingXl),
				height: s.ref(tokens.spacing!.spacingXl),
			},
			"2xl": {
				width: s.ref(tokens.spacing!.spacing2xl),
				height: s.ref(tokens.spacing!.spacing2xl),
			},
			"3xl": {
				width: s.ref(tokens.spacing!.spacing3xl),
				height: s.ref(tokens.spacing!.spacing3xl),
			},
		},
	},
	defaultVariants: { spacing: "md" },
});

// Border width preview recipe
export const borderWidthPreview = s.recipe({
	name: "preset-border-width-preview",
	base: {
		width: "80px",
		height: "80px",
		borderRadius: "4px",
		borderStyle: "solid",
		borderColor: "#3b82f6",
		background: "#f8fafc",
	},
	variants: {
		borderWidth: {
			none: { borderWidth: s.ref(tokens.borderWidth!.borderWidthNone) },
			thin: { borderWidth: s.ref(tokens.borderWidth!.borderWidthThin) },
			medium: { borderWidth: s.ref(tokens.borderWidth!.borderWidthMedium) },
			thick: { borderWidth: s.ref(tokens.borderWidth!.borderWidthThick) },
		},
	},
	defaultVariants: { borderWidth: "thin" },
});

// Border radius preview recipe
export const borderRadiusPreview = s.recipe({
	name: "preset-border-radius-preview",
	base: {
		width: "80px",
		height: "80px",
		background: "#3b82f6",
	},
	variants: {
		borderRadius: {
			none: { borderRadius: s.ref(tokens.borderRadius!.borderRadiusNone) },
			sm: { borderRadius: s.ref(tokens.borderRadius!.borderRadiusSm) },
			md: { borderRadius: s.ref(tokens.borderRadius!.borderRadiusMd) },
			lg: { borderRadius: s.ref(tokens.borderRadius!.borderRadiusLg) },
			xl: { borderRadius: s.ref(tokens.borderRadius!.borderRadiusXl) },
			"2xl": { borderRadius: s.ref(tokens.borderRadius!.borderRadius2xl) },
			full: { borderRadius: s.ref(tokens.borderRadius!.borderRadiusFull) },
		},
	},
	defaultVariants: { borderRadius: "md" },
});

// Box shadow preview recipe
export const boxShadowPreview = s.recipe({
	name: "preset-box-shadow-preview",
	base: {
		width: "80px",
		height: "80px",
		borderRadius: "8px",
		background: "#ffffff",
	},
	variants: {
		boxShadow: {
			none: { boxShadow: s.ref(tokens.boxShadow!.boxShadowNone) },
			sm: { boxShadow: s.ref(tokens.boxShadow!.boxShadowSm) },
			md: { boxShadow: s.ref(tokens.boxShadow!.boxShadowMd) },
			lg: { boxShadow: s.ref(tokens.boxShadow!.boxShadowLg) },
			xl: { boxShadow: s.ref(tokens.boxShadow!.boxShadowXl) },
			"2xl": { boxShadow: s.ref(tokens.boxShadow!.boxShadow2xl) },
		},
	},
	defaultVariants: { boxShadow: "md" },
});

// Font family preview recipe
export const fontFamilyPreview = s.recipe({
	name: "preset-font-family-preview",
	base: {
		fontSize: "16px",
		lineHeight: "1.5",
		padding: "12px 16px",
		background: "#f8fafc",
		borderRadius: "4px",
	},
	variants: {
		fontFamily: {
			base: { fontFamily: s.ref(tokens.fontFamily!.fontFamilyBase) },
			print: { fontFamily: s.ref(tokens.fontFamily!.fontFamilyPrint) },
			mono: { fontFamily: s.ref(tokens.fontFamily!.fontFamilyMono) },
		},
	},
	defaultVariants: { fontFamily: "base" },
});

// Font size preview recipe
export const fontSizePreview = s.recipe({
	name: "preset-font-size-preview",
	base: {
		lineHeight: "1.4",
	},
	variants: {
		fontSize: {
			"2xs": { fontSize: s.ref(tokens.fontSize!.fontSize2xs) },
			xs: { fontSize: s.ref(tokens.fontSize!.fontSizeXs) },
			sm: { fontSize: s.ref(tokens.fontSize!.fontSizeSm) },
			md: { fontSize: s.ref(tokens.fontSize!.fontSizeMd) },
			lg: { fontSize: s.ref(tokens.fontSize!.fontSizeLg) },
			xl: { fontSize: s.ref(tokens.fontSize!.fontSizeXl) },
			"2xl": { fontSize: s.ref(tokens.fontSize!.fontSize2xl) },
			"3xl": { fontSize: s.ref(tokens.fontSize!.fontSize3xl) },
			"4xl": { fontSize: s.ref(tokens.fontSize!.fontSize4xl) },
			"5xl": { fontSize: s.ref(tokens.fontSize!.fontSize5xl) },
		},
	},
	defaultVariants: { fontSize: "md" },
});

// Font weight preview recipe
export const fontWeightPreview = s.recipe({
	name: "preset-font-weight-preview",
	base: {
		fontSize: "18px",
		lineHeight: "1.5",
	},
	variants: {
		fontWeight: {
			thin: { fontWeight: s.ref(tokens.fontWeight!.fontWeightThin) },
			extralight: {
				fontWeight: s.ref(tokens.fontWeight!.fontWeightExtralight),
			},
			light: { fontWeight: s.ref(tokens.fontWeight!.fontWeightLight) },
			normal: { fontWeight: s.ref(tokens.fontWeight!.fontWeightNormal) },
			medium: { fontWeight: s.ref(tokens.fontWeight!.fontWeightMedium) },
			semibold: { fontWeight: s.ref(tokens.fontWeight!.fontWeightSemibold) },
			bold: { fontWeight: s.ref(tokens.fontWeight!.fontWeightBold) },
			extrabold: { fontWeight: s.ref(tokens.fontWeight!.fontWeightExtrabold) },
			black: { fontWeight: s.ref(tokens.fontWeight!.fontWeightBlack) },
		},
	},
	defaultVariants: { fontWeight: "normal" },
});

// Line height preview recipe
export const lineHeightPreview = s.recipe({
	name: "preset-line-height-preview",
	base: {
		fontSize: "14px",
		padding: "12px 16px",
		background: "#f8fafc",
		borderRadius: "4px",
		maxWidth: "300px",
	},
	variants: {
		lineHeight: {
			none: { lineHeight: s.ref(tokens.lineHeight!.lineHeightNone) },
			tight: { lineHeight: s.ref(tokens.lineHeight!.lineHeightTight) },
			snug: { lineHeight: s.ref(tokens.lineHeight!.lineHeightSnug) },
			normal: { lineHeight: s.ref(tokens.lineHeight!.lineHeightNormal) },
			relaxed: { lineHeight: s.ref(tokens.lineHeight!.lineHeightRelaxed) },
			loose: { lineHeight: s.ref(tokens.lineHeight!.lineHeightLoose) },
		},
	},
	defaultVariants: { lineHeight: "normal" },
});

// Easing preview recipe (for animation demonstration)
export const easingPreview = s.recipe({
	name: "preset-easing-preview",
	base: {
		width: "60px",
		height: "60px",
		background: "#3b82f6",
		borderRadius: "8px",
		transition: "transform 0.5s",
		"&:hover": {
			transform: "translateX(100px)",
		},
	},
	variants: {
		easing: {
			linear: {
				transitionTimingFunction: s.ref(tokens.easing!.easingLinear),
			},
			"ease-in": {
				transitionTimingFunction: s.ref(tokens.easing!.easingEaseIn),
			},
			"ease-out": {
				transitionTimingFunction: s.ref(tokens.easing!.easingEaseOut),
			},
			"ease-in-out": {
				transitionTimingFunction: s.ref(tokens.easing!.easingEaseInOut),
			},
		},
	},
	defaultVariants: { easing: "ease-in-out" },
});

// Export token values for story display
export const tokenValues = {
	colors: {
		primary: "#3b82f6",
		secondary: "#6b7280",
		success: "#22c55e",
		warning: "#f59e0b",
		danger: "#ef4444",
		info: "#06b6d4",
		light: "#f8fafc",
		dark: "#1e293b",
	},
	spacing: {
		"2xs": "0.25rem",
		xs: "0.5rem",
		sm: "0.75rem",
		md: "1rem",
		lg: "1.5rem",
		xl: "2rem",
		"2xl": "3rem",
		"3xl": "4rem",
	},
	borderWidth: {
		none: "0",
		thin: "thin",
		medium: "medium",
		thick: "thick",
	},
	borderRadius: {
		none: "0",
		sm: "0.125rem",
		md: "0.25rem",
		lg: "0.5rem",
		xl: "0.75rem",
		"2xl": "1rem",
		full: "9999px",
	},
	boxShadow: {
		none: "none",
		sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
		md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
		lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
		xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
		"2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
	},
	fontFamily: {
		base: "System UI",
		print: "Georgia",
		mono: "Monospace",
	},
	fontSize: {
		"2xs": "0.625rem",
		xs: "0.75rem",
		sm: "0.875rem",
		md: "1rem",
		lg: "1.125rem",
		xl: "1.25rem",
		"2xl": "1.5rem",
		"3xl": "1.875rem",
		"4xl": "2.25rem",
		"5xl": "3rem",
	},
	fontWeight: {
		thin: "100",
		extralight: "200",
		light: "300",
		normal: "400",
		medium: "500",
		semibold: "600",
		bold: "700",
		extrabold: "800",
		black: "900",
	},
	lineHeight: {
		none: "1",
		tight: "1.25",
		snug: "1.375",
		normal: "1.5",
		relaxed: "1.625",
		loose: "2",
	},
	easing: {
		linear: "linear",
		"ease-in": "ease-in",
		"ease-out": "ease-out",
		"ease-in-out": "ease-in-out",
	},
};

// Section styles for the overview
s.selector(".preset-overview", {
	display: "flex",
	flexDirection: "column",
	gap: "48px",
	padding: "24px",
});

s.selector(".preset-section", {
	display: "flex",
	flexDirection: "column",
	gap: "16px",
});

s.selector(".preset-section__title", {
	fontSize: "1.5rem",
	fontWeight: "600",
	margin: "0",
	color: "#1e293b",
});

s.selector(".preset-section__description", {
	fontSize: "0.875rem",
	color: "#64748b",
	margin: "0 0 8px 0",
});

export default s;
