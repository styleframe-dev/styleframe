import { createUseUtility } from "../../utils";
import { displayValues } from "../../values";

/**
 * Create display utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useDisplayUtility(s, { flex: 'flex', block: 'block', hidden: 'none' });
 * // Generates: ._display:flex, ._display:block, ._display:hidden
 * ```
 */
export const useDisplayUtility = createUseUtility(
	"display",
	({ value }) => ({
		display: value,
	}),
	{ defaults: displayValues },
);
