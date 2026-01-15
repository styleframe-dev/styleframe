import { createUseUtility } from "../../utils";

/**
 * Create columns utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useColumnsUtility(s, {
 *     '1': '1',
 *     '2': '2',
 *     '3': '3',
 *     auto: 'auto',
 *     '3xs': '16rem',
 *     '2xs': '18rem',
 *     xs: '20rem',
 * });
 * ```
 */
export const useColumnsUtility = createUseUtility("columns", ({ value }) => ({
	columns: value,
}));
