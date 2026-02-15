import { createUseUtility } from "../../utils";

/**
 * Create font-size utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useFontSizeUtility(s, {
 *     xs: '0.75rem',
 *     sm: '0.875rem',
 *     base: '1rem',
 *     lg: '1.125rem',
 *     xl: '1.25rem',
 * });
 * ```
 */
export const useFontSizeUtility = createUseUtility(
	"font-size",
	({ value }) => ({
		fontSize: value,
	}),
	{ namespace: "font-size" },
);
