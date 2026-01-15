import { createUseUtility } from "../../utils";

/**
 * Create z-index utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useZIndexUtility(s, {
 *     '0': '0',
 *     '10': '10',
 *     '20': '20',
 *     '30': '30',
 *     '40': '40',
 *     '50': '50',
 *     auto: 'auto',
 * });
 * ```
 */
export const useZIndexUtility = createUseUtility("z-index", ({ value }) => ({
	zIndex: value,
}));
