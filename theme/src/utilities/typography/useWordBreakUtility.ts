import { createUseUtility } from "../../utils";

/**
 * Default word-break utility values matching Tailwind CSS.
 */
export const defaultWordBreakValues = {
	normal: "normal",
	words: "break-word",
	all: "break-all",
	keep: "keep-all",
};

/**
 * Create word-break utility classes.
 */
export const useWordBreakUtility = createUseUtility(
	"word-break",
	({ value }) => ({
		wordBreak: value,
	}),
	{ defaults: defaultWordBreakValues },
);
