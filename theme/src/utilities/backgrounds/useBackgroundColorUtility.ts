import { createUseUtility } from "../../utils";

/**
 * Create background-color utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useBackgroundColorUtility(s, {
 *     inherit: 'inherit',
 *     current: 'currentColor',
 *     transparent: 'transparent',
 *     black: '#000',
 *     white: '#fff',
 * });
 * ```
 */
export const useBackgroundColorUtility = createUseUtility(
	"background",
	({ value }) => ({
		backgroundColor: value,
	}),
);
