import { createUseUtility } from "../../utils";

/**
 * Default white-space utility values matching Tailwind CSS.
 */
export const defaultWhitespaceValues = {
	normal: "normal",
	nowrap: "nowrap",
	pre: "pre",
	"pre-line": "pre-line",
	"pre-wrap": "pre-wrap",
	"break-spaces": "break-spaces",
};

/**
 * Create white-space utility classes.
 */
export const useWhitespaceUtility = createUseUtility(
	"whitespace",
	({ value }) => ({
		whiteSpace: value,
	}),
	{ defaults: defaultWhitespaceValues },
);
