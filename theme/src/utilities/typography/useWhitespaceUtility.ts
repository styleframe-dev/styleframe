import { createUseUtility } from "../../utils";
import { whitespaceValues } from "../../values";

/**
 * Create white-space utility classes.
 */
export const useWhitespaceUtility = createUseUtility(
	"whitespace",
	({ value }) => ({
		whiteSpace: value,
	}),
	{ defaults: whitespaceValues },
);
