import { createUseUtility } from "../../utils";

/**
 * Default box-decoration-break utility values matching Tailwind CSS.
 */
export const defaultBoxDecorationBreakValues = {
	clone: "clone",
	slice: "slice",
};

/**
 * Default box-sizing utility values matching Tailwind CSS.
 */
export const defaultBoxSizingValues = {
	border: "border-box",
	content: "content-box",
};

/**
 * Create box-decoration-break utility classes.
 */
export const useBoxDecorationBreakUtility = createUseUtility(
	"box-decoration-break",
	({ value }) => ({
		boxDecorationBreak: value,
	}),
	{ defaults: defaultBoxDecorationBreakValues },
);

/**
 * Create box-sizing utility classes.
 */
export const useBoxSizingUtility = createUseUtility(
	"box-sizing",
	({ value }) => ({
		boxSizing: value,
	}),
	{ defaults: defaultBoxSizingValues },
);
