import type { Styleframe } from "@styleframe/core";
import { useDesignTokensPreset } from "@styleframe/theme";

/**
 * Shared design tokens for the storybook using the default preset.
 * Provides consistent colors, spacing, typography, etc. across all stories.
 */
export function useDesignTokens(s: Styleframe) {
	return useDesignTokensPreset(s);
}
