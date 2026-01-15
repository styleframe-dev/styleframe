import { createUseUtility } from "../../utils";

/**
 * Default vertical-align utility values matching Tailwind CSS.
 */
export const defaultVerticalAlignValues = {
	baseline: "baseline",
	top: "top",
	middle: "middle",
	bottom: "bottom",
	"text-top": "text-top",
	"text-bottom": "text-bottom",
	sub: "sub",
	super: "super",
};

/**
 * Create vertical-align utility classes.
 */
export const useVerticalAlignUtility = createUseUtility(
	"vertical-align",
	({ value }) => ({
		verticalAlign: value,
	}),
	{ defaults: defaultVerticalAlignValues },
);
