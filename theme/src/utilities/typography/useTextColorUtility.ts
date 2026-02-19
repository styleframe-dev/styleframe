import { createUseUtility } from "../../utils";

/**
 * Create text-color utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useTextColorUtility(s, {
 *     inherit: 'inherit',
 *     current: 'currentColor',
 *     transparent: 'transparent',
 *     black: '#000',
 *     white: '#fff',
 * });
 * ```
 */
export const useTextColorUtility = createUseUtility(
	"text-color",
	({ value }) => ({
		color: value,
	}),
	{ namespace: ["text-color", "color"] },
);
