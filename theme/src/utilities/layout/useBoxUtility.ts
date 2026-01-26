import { createUseUtility } from "../../utils";
import { boxDecorationBreakValues, boxSizingValues } from "../../values";

/**
 * Create box-decoration-break utility classes.
 */
export const useBoxDecorationBreakUtility = createUseUtility(
	"box-decoration-break",
	({ value }) => ({
		boxDecorationBreak: value,
	}),
	{ defaults: boxDecorationBreakValues },
);

/**
 * Create box-sizing utility classes.
 */
export const useBoxSizingUtility = createUseUtility(
	"box-sizing",
	({ value }) => ({
		boxSizing: value,
	}),
	{ defaults: boxSizingValues },
);
