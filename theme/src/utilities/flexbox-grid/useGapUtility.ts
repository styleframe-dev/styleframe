import { createUseSpacingUtility } from "../../utils";

/**
 * Create gap utility classes with multiplier support.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * const createGap = useGapUtility(s, { '0': '0', '1': '0.25rem', '2': '0.5rem' });
 *
 * // Add multiplier values (with @ prefix):
 * createGap(["@1.5", "@2"]);
 * // Generates:
 * // ._gap:1.5 { gap: calc(var(--spacing) * 1.5); }
 * // ._gap:2 { gap: calc(var(--spacing) * 2); }
 * ```
 */
export const useGapUtility = createUseSpacingUtility("gap", ({ value }) => ({
	gap: value,
}));

/**
 * Create column-gap utility classes with multiplier support.
 */
export const useGapXUtility = createUseSpacingUtility("gap-x", ({ value }) => ({
	columnGap: value,
}));

/**
 * Create row-gap utility classes with multiplier support.
 */
export const useGapYUtility = createUseSpacingUtility("gap-y", ({ value }) => ({
	rowGap: value,
}));
