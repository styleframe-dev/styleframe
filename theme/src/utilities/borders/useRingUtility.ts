import { createUseUtility } from "../../utils";

/**
 * Create ring-width utility classes.
 * Uses box-shadow to create a ring effect.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useRingWidthUtility(s, {
 *     '0': '0px',
 *     '1': '1px',
 *     '2': '2px',
 *     default: '3px',
 *     '4': '4px',
 *     '8': '8px',
 * });
 * ```
 */
export const useRingWidthUtility = createUseUtility("ring", ({ value }) => ({
	"--tw-ring-offset-shadow":
		"var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
	"--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(${value} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
	boxShadow:
		"var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)",
}));

/**
 * Create ring-inset utility classes.
 */
export const useRingInsetUtility = createUseUtility(
	"ring-inset",
	() => ({
		"--tw-ring-inset": "inset",
	}),
	{
		defaults: {
			default: true,
		},
	},
);

/**
 * Create ring-color utility classes.
 */
export const useRingColorUtility = createUseUtility(
	"ring-color",
	({ value }) => ({
		"--tw-ring-color": value,
	}),
);

/**
 * Create ring-offset-width utility classes.
 */
export const useRingOffsetWidthUtility = createUseUtility(
	"ring-offset",
	({ value }) => ({
		"--tw-ring-offset-width": value,
	}),
);

/**
 * Create ring-offset-color utility classes.
 */
export const useRingOffsetColorUtility = createUseUtility(
	"ring-offset-color",
	({ value }) => ({
		"--tw-ring-offset-color": value,
	}),
);
