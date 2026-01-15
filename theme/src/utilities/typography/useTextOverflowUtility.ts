import { createUseUtility } from "../../utils";

/**
 * Default text-overflow utility values matching Tailwind CSS.
 */
export const defaultTextOverflowValues = {
	truncate: "ellipsis",
	"text-ellipsis": "ellipsis",
	"text-clip": "clip",
};

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
	{ defaults: defaultTextOverflowValues },
);
