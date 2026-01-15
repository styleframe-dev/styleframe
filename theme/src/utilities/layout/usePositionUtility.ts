import { createUseUtility } from "../../utils";

/**
 * Default position utility values matching Tailwind CSS.
 */
export const defaultPositionValues = {
	static: "static",
	fixed: "fixed",
	absolute: "absolute",
	relative: "relative",
	sticky: "sticky",
};

/**
 * Create position utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * usePositionUtility(s);
 * // Uses defaults: ._position:static, ._position:fixed, etc.
 * ```
 */
export const usePositionUtility = createUseUtility(
	"position",
	({ value }) => ({
		position: value,
	}),
	{ defaults: defaultPositionValues },
);
