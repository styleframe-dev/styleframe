import { createUseUtility } from "../../utils";

/**
 * Default visibility utility values matching Tailwind CSS.
 */
export const defaultVisibilityValues = {
	visible: "visible",
	invisible: "hidden",
	collapse: "collapse",
};

/**
 * Create visibility utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useVisibilityUtility(s);
 * // Uses defaults: ._visibility:visible, ._visibility:invisible, ._visibility:collapse
 * ```
 */
export const useVisibilityUtility = createUseUtility(
	"visibility",
	({ value }) => ({
		visibility: value,
	}),
	{ defaults: defaultVisibilityValues },
);
