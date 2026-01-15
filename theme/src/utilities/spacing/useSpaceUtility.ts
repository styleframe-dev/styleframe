import { createUseUtility } from "../../utils";

/**
 * Create space-x utility classes (horizontal space between children).
 * Uses the "lobotomized owl" selector to add margin-left to all but the first child.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useSpaceXUtility(s, { sm: '0.5rem', md: '1rem' });
 * // Generates: ._space-x:sm > * + *, ._space-x:md > * + *
 * ```
 */
export const useSpaceXUtility = createUseUtility("space-x", ({ value }) => ({
	"& > * + *": {
		marginLeft: value,
	},
}));

/**
 * Create space-y utility classes (vertical space between children).
 * Uses the "lobotomized owl" selector to add margin-top to all but the first child.
 */
export const useSpaceYUtility = createUseUtility("space-y", ({ value }) => ({
	"& > * + *": {
		marginTop: value,
	},
}));

/**
 * Create space-x-reverse utility classes.
 * Reverses the direction of horizontal spacing.
 */
export const useSpaceXReverseUtility = createUseUtility(
	"space-x-reverse",
	({ value }) => ({
		"& > * + *": {
			marginRight: value,
			marginLeft: 0,
		},
	}),
);

/**
 * Create space-y-reverse utility classes.
 * Reverses the direction of vertical spacing.
 */
export const useSpaceYReverseUtility = createUseUtility(
	"space-y-reverse",
	({ value }) => ({
		"& > * + *": {
			marginBottom: value,
			marginTop: 0,
		},
	}),
);
