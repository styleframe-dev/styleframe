import { createUseUtility } from "../../utils";
import { textAlignValues } from "../../values";

/**
 * Create text-align utility classes.
 */
export const useTextAlignUtility = createUseUtility(
	"text-align",
	({ value }) => ({
		textAlign: value,
	}),
	{ defaults: textAlignValues },
);
