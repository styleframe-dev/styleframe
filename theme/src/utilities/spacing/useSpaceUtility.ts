import { createUseSpacingUtility } from "../../utils";

/**
 * Create space-x utility classes with multiplier support (horizontal space between children).
 * Uses the "lobotomized owl" selector to add margin-left to all but the first child.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * const createSpaceX = useSpaceXUtility(s, { sm: '0.5rem', md: '1rem' });
 *
 * // Add multiplier values (with @ prefix):
 * createSpaceX(["@1.5", "@2"]);
 * // Generates:
 * // ._space-x:1.5 > * + * { margin-left: calc(var(--spacing) * 1.5); }
 * ```
 */
export const useSpaceXUtility = createUseSpacingUtility(
	"space-x",
	({ value }) => ({
		"& > * + *": {
			marginLeft: value,
		},
	}),
	{ namespace: "spacing" },
);

/**
 * Create space-y utility classes with multiplier support (vertical space between children).
 * Uses the "lobotomized owl" selector to add margin-top to all but the first child.
 */
export const useSpaceYUtility = createUseSpacingUtility(
	"space-y",
	({ value }) => ({
		"& > * + *": {
			marginTop: value,
		},
	}),
	{ namespace: "spacing" },
);

/**
 * Create space-x-reverse utility classes.
 * Reverses the direction of horizontal spacing.
 */
export const useSpaceXReverseUtility = createUseSpacingUtility(
	"space-x-reverse",
	({ value }) => ({
		"& > * + *": {
			marginRight: value,
			marginLeft: 0,
		},
	}),
	{ namespace: "spacing" },
);

/**
 * Create space-y-reverse utility classes.
 * Reverses the direction of vertical spacing.
 */
export const useSpaceYReverseUtility = createUseSpacingUtility(
	"space-y-reverse",
	({ value }) => ({
		"& > * + *": {
			marginBottom: value,
			marginTop: 0,
		},
	}),
	{ namespace: "spacing" },
);
