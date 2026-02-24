import { createUseUtility } from "../../utils";
import { whitespaceValues } from "../../values";

/**
 * Create white-space utility classes (Tailwind-style "whitespace" name).
 */
export const useWhitespaceUtility = createUseUtility(
	"whitespace",
	({ value }) => ({
		whiteSpace: value,
	}),
	{ defaults: whitespaceValues },
);

/**
 * Create white-space utility classes (CSS property name).
 */
export const useWhiteSpaceUtility = createUseUtility(
	"white-space",
	({ value }) => ({
		whiteSpace: value,
	}),
	{ defaults: whitespaceValues },
);
