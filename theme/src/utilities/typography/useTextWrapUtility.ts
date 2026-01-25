import { createUseUtility } from "../../utils";
import { textWrapValues } from "../../values";

/**
 * Create text-wrap utility classes.
 */
export const useTextWrapUtility = createUseUtility(
	"text-wrap",
	({ value }) => ({
		textWrap: value,
	}),
	{ defaults: textWrapValues },
);
