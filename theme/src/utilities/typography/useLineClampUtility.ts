import { createUseUtility } from "../../utils";

/**
 * Create line-clamp utility classes.
 * Limits the number of visible lines with an ellipsis.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useLineClampUtility(s, { '1': '1', '2': '2', '3': '3', none: 'unset' });
 * ```
 */
export const useLineClampUtility = createUseUtility(
	"line-clamp",
	({ value }) =>
		value === "unset" || value === "none"
			? {
					overflow: "visible",
					display: "block",
					WebkitBoxOrient: "horizontal",
					WebkitLineClamp: "unset",
				}
			: {
					overflow: "hidden",
					display: "-webkit-box",
					WebkitBoxOrient: "vertical",
					WebkitLineClamp: value,
				},
);
