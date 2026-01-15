import { createUseUtility } from "../../utils";

/**
 * Create size utility classes (sets both width and height).
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useSizeUtility(s, {
 *     full: '100%',
 *     '4': '1rem',
 *     '8': '2rem',
 * });
 * // Generates classes that set both width and height
 * ```
 */
export const useSizeUtility = createUseUtility("size", ({ value }) => ({
	width: value,
	height: value,
}));
