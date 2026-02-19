import { createUseUtility } from "../../utils";

/**
 * Create letter-spacing utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useLetterSpacingUtility(s, {
 *     tighter: '-0.05em',
 *     tight: '-0.025em',
 *     normal: '0em',
 *     wide: '0.025em',
 *     wider: '0.05em',
 *     widest: '0.1em',
 * });
 * ```
 */
export const useLetterSpacingUtility = createUseUtility(
	"letter-spacing",
	({ value }) => ({
		letterSpacing: value,
	}),
	{ namespace: "letter-spacing" },
);
