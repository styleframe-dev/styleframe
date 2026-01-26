import { createUseUtility } from "../../utils";
import { textTransformValues } from "../../values";

/**
 * Create text-transform utility classes.
 */
export const useTextTransformUtility = createUseUtility(
	"text-transform",
	({ value }) => ({
		textTransform: value,
	}),
	{ defaults: textTransformValues },
);
