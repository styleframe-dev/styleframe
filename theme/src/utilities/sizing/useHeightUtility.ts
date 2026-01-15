import { createUseUtility } from "../../utils";

/**
 * Create height utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useHeightUtility(s, {
 *     full: '100%',
 *     screen: '100vh',
 *     auto: 'auto',
 *     '1/2': '50%',
 * });
 * ```
 */
export const useHeightUtility = createUseUtility("height", ({ value }) => ({
	height: value,
}));

/**
 * Create min-height utility classes.
 */
export const useMinHeightUtility = createUseUtility(
	"min-height",
	({ value }) => ({
		minHeight: value,
	}),
);

/**
 * Create max-height utility classes.
 */
export const useMaxHeightUtility = createUseUtility(
	"max-height",
	({ value }) => ({
		maxHeight: value,
	}),
);
