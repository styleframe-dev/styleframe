import { createUseUtility } from "../../utils";

/**
 * Create gap utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useGapUtility(s, { '0': '0', '1': '0.25rem', '2': '0.5rem' });
 * ```
 */
export const useGapUtility = createUseUtility("gap", ({ value }) => ({
	gap: value,
}));

/**
 * Create column-gap utility classes.
 */
export const useGapXUtility = createUseUtility("gap-x", ({ value }) => ({
	columnGap: value,
}));

/**
 * Create row-gap utility classes.
 */
export const useGapYUtility = createUseUtility("gap-y", ({ value }) => ({
	rowGap: value,
}));
