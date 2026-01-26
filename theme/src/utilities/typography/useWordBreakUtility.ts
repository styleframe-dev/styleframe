import { createUseUtility } from "../../utils";
import { wordBreakValues } from "../../values";

/**
 * Create word-break utility classes.
 */
export const useWordBreakUtility = createUseUtility(
	"word-break",
	({ value }) => ({
		wordBreak: value,
	}),
	{ defaults: wordBreakValues },
);
