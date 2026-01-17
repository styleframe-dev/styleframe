import { createUseUtility } from "../../utils";

/**
 * Create color utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useColorUtility(s, {
 *     inherit: 'inherit',
 *     current: 'currentColor',
 *     transparent: 'transparent',
 *     black: '#000',
 *     white: '#fff',
 * });
 * ```
 */
export const useColorUtility = createUseUtility("color", ({ value }) => ({
	color: value,
}));
