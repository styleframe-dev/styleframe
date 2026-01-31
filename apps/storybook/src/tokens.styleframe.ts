import { useDesignTokensPreset } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

/**
 * Shared design tokens for the storybook using the default preset.
 * This provides consistent colors, spacing, typography, etc. across all stories.
 */
export const tokens = useDesignTokensPreset(s, {
	colors: {
		primary: "#1E3A8A",
		secondary: "#9333EA",
		info: "#3B82F6",
		success: "#10B981",
		warning: "#F59E0B",
		danger: "#EF4444",
		light: "#f8fafc",
		dark: "#1e293b",
	},
});

export const {
	colors,
	spacing,
	borderRadius,
	borderWidth,
	borderStyle,
	boxShadow,
	fontFamily,
	fontSize,
	fontWeight,
	lineHeight,
	letterSpacing,
	scale,
	scalePowers,
	breakpoint,
	easing,
} = tokens;

export default s;
