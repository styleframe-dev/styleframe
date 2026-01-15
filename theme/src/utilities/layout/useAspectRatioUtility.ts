import { createUseUtility } from "../../utils";

/**
 * Default aspect ratio utility values matching Tailwind CSS.
 */
export const defaultAspectRatioValues = {
	auto: "auto",
	square: "1 / 1",
	video: "16 / 9",
};

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
	{ defaults: defaultAspectRatioValues },
);
