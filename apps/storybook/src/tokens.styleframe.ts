import { useDesignTokensPreset } from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();

/**
 * Shared design tokens for the storybook using the default preset.
 * This provides consistent colors, spacing, typography, etc. across all stories.
 */
export const tokens = useDesignTokensPreset(s);

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
