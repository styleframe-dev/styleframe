import { createUseUtility } from "../../utils";

/**
 * Create font-family utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useFontFamilyUtility(s, {
 *     sans: 'ui-sans-serif, system-ui, sans-serif',
 *     serif: 'ui-serif, Georgia, serif',
 *     mono: 'ui-monospace, monospace',
 * });
 * ```
 */
export const useFontFamilyUtility = createUseUtility(
	"font-family",
	({ value }) => ({
		fontFamily: value,
	}),
);
