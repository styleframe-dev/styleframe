import type { Styleframe } from "styleframe";

/**
 * Shared color tokens for swatch primitives
 */
export function useSwatchColors(s: Styleframe) {
	const primary = s.variable("swatch.color.primary", "#1E3A8A", {
		default: true,
	});
	const secondary = s.variable("swatch.color.secondary", "#64748b", {
		default: true,
	});
	const tertiary = s.variable("swatch.color.tertiary", "#374151", {
		default: true,
	});
	const background = s.variable("swatch.color.background", "#ffffff", {
		default: true,
	});
	const border = s.variable("swatch.color.border", "#e2e8f0", {
		default: true,
	});

	return {
		swatchColorPrimary: primary,
		swatchColorSecondary: secondary,
		swatchColorTertiary: tertiary,
		swatchColorBackground: background,
		swatchColorBorder: border,
	};
}

/**
 * Shared spacing tokens for swatch primitives
 */
export function useSwatchSpacing(s: Styleframe) {
	const gapXs = s.variable("swatch.spacing.gap.xs", "4px", { default: true });
	const gapSm = s.variable("swatch.spacing.gap.sm", "8px", { default: true });
	const gapMd = s.variable("swatch.spacing.gap.md", "16px", { default: true });
	const gapLg = s.variable("swatch.spacing.gap.lg", "24px", { default: true });
	const paddingRow = s.variable("swatch.spacing.padding.row", "12px 16px", {
		default: true,
	});
	const paddingMd = s.variable("swatch.spacing.padding.md", "16px", {
		default: true,
	});

	return {
		swatchGapXs: gapXs,
		swatchGapSm: gapSm,
		swatchGapMd: gapMd,
		swatchGapLg: gapLg,
		swatchPaddingRow: paddingRow,
		swatchPaddingMd: paddingMd,
	};
}

/**
 * Shared typography tokens for swatch primitives
 */
export function useSwatchTypography(s: Styleframe) {
	const fontSize = s.variable("swatch.font.size", "14px", { default: true });
	const fontSizeSm = s.variable("swatch.font.size.sm", "12px", {
		default: true,
	});
	const fontWeightNormal = s.variable("swatch.font.weight.normal", "500", {
		default: true,
	});
	const fontWeightBold = s.variable("swatch.font.weight.bold", "600", {
		default: true,
	});
	const fontFamilyMono = s.variable("swatch.font.family.mono", "monospace", {
		default: true,
	});

	return {
		swatchFontSize: fontSize,
		swatchFontSizeSm: fontSizeSm,
		swatchFontWeightNormal: fontWeightNormal,
		swatchFontWeightBold: fontWeightBold,
		swatchFontFamilyMono: fontFamilyMono,
	};
}

/**
 * Shared dimension tokens for swatch primitives
 */
export function useSwatchDimensions(s: Styleframe) {
	const previewSize = s.variable("swatch.preview.size", "100px", {
		default: true,
	});
	const previewSizeSm = s.variable("swatch.preview.size.sm", "80px", {
		default: true,
	});
	const previewHeightSm = s.variable("swatch.preview.height.sm", "60px", {
		default: true,
	});
	const barHeight = s.variable("swatch.bar.height", "8px", { default: true });
	const borderRadius = s.variable("swatch.border.radius", "8px", {
		default: true,
	});
	const borderRadiusSm = s.variable("swatch.border.radius.sm", "4px", {
		default: true,
	});
	const nameMinWidth = s.variable("swatch.name.min-width", "40px", {
		default: true,
	});
	const valueMinWidth = s.variable("swatch.value.min-width", "60px", {
		default: true,
	});

	return {
		swatchPreviewSize: previewSize,
		swatchPreviewSizeSm: previewSizeSm,
		swatchPreviewHeightSm: previewHeightSm,
		swatchBarHeight: barHeight,
		swatchBorderRadius: borderRadius,
		swatchBorderRadiusSm: borderRadiusSm,
		swatchNameMinWidth: nameMinWidth,
		swatchValueMinWidth: valueMinWidth,
	};
}
