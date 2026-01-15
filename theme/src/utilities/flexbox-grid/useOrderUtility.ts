import { createUseUtility } from "../../utils";

/**
 * Create order utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useOrderUtility(s, {
 *     '1': '1',
 *     '2': '2',
 *     first: '-9999',
 *     last: '9999',
 *     none: '0',
 * });
 * ```
 */
export const useOrderUtility = createUseUtility("order", ({ value }) => ({
	order: value,
}));
