import { createUseUtility } from "../../utils";
import { aspectRatioValues } from "../../values";

/**
 * Create aspect-ratio utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useAspectRatioUtility(s, { square: '1 / 1', video: '16 / 9', '4/3': '4 / 3' });
 * ```
 */
export const useAspectRatioUtility = createUseUtility(
	"aspect-ratio",
	({ value }) => ({
		aspectRatio: value,
	}),
	{ defaults: aspectRatioValues },
);
