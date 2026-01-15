import { createUseUtility } from "../../utils";

/**
 * Default text-transform utility values matching Tailwind CSS.
 */
export const defaultTextTransformValues = {
	uppercase: "uppercase",
	lowercase: "lowercase",
	capitalize: "capitalize",
	"normal-case": "none",
};

/**
 * Create text-transform utility classes.
 */
export const useTextTransformUtility = createUseUtility(
	"text-transform",
	({ value }) => ({
		textTransform: value,
	}),
	{ defaults: defaultTextTransformValues },
);
