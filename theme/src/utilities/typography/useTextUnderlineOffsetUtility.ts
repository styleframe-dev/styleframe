import { createUseUtility } from "../../utils";

/**
 * Create text-underline-offset utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useTextUnderlineOffsetUtility(s, {
 *     auto: 'auto',
 *     '0': '0px',
 *     '1': '1px',
 *     '2': '2px',
 *     '4': '4px',
 *     '8': '8px',
 * });
 * ```
 */
export const useTextUnderlineOffsetUtility = createUseUtility(
	"underline-offset",
	({ value }) => ({
		textUnderlineOffset: value,
	}),
);
