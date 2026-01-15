import { createUseUtility } from "../../utils";

/**
 * Create width utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useWidthUtility(s, {
 *     full: '100%',
 *     screen: '100vw',
 *     auto: 'auto',
 *     '1/2': '50%',
 *     '1/3': '33.333333%',
 * });
 * ```
 */
export const useWidthUtility = createUseUtility("width", ({ value }) => ({
	width: value,
}));

/**
 * Create min-width utility classes.
 */
export const useMinWidthUtility = createUseUtility(
	"min-width",
	({ value }) => ({
		minWidth: value,
	}),
);

/**
 * Create max-width utility classes.
 */
export const useMaxWidthUtility = createUseUtility(
	"max-width",
	({ value }) => ({
		maxWidth: value,
	}),
);
