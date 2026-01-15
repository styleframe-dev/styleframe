import { createUseUtility } from "../../utils";

/**
 * Create content utility classes for pseudo-elements.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useContentUtility(s, {
 *     none: 'none',
 *     empty: "''",
 * });
 * ```
 */
export const useContentUtility = createUseUtility("content", ({ value }) => ({
	content: value,
}));
