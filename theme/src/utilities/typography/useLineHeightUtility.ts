import { createUseUtility } from "../../utils";

/**
 * Create line-height utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useLineHeightUtility(s, {
 *     none: '1',
 *     tight: '1.25',
 *     snug: '1.375',
 *     normal: '1.5',
 *     relaxed: '1.625',
 *     loose: '2',
 * });
 * ```
 */
export const useLineHeightUtility = createUseUtility(
	"line-height",
	({ value }) => ({
		lineHeight: value,
	}),
	{ namespace: "line-height" },
);
