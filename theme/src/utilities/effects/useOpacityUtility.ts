import { createUseUtility } from "../../utils";

/**
 * Create opacity utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useOpacityUtility(s, {
 *     '0': '0',
 *     '5': '0.05',
 *     '10': '0.1',
 *     '25': '0.25',
 *     '50': '0.5',
 *     '75': '0.75',
 *     '100': '1',
 * });
 * ```
 */
export const useOpacityUtility = createUseUtility("opacity", ({ value }) => ({
	opacity: value,
}));
