import { createUseUtility } from "../../utils";
import { textOverflowValues } from "../../values";

/**
 * Create text-overflow utility classes.
 */
export const useTextOverflowUtility = createUseUtility(
	"text-overflow",
	({ value }) => {
		if (value === "ellipsis") {
			return {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
			};
		}
		return {
			textOverflow: value,
		};
	},
	{ defaults: textOverflowValues },
);
