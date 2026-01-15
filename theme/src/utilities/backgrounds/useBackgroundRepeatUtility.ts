import { createUseUtility } from "../../utils";

/**
 * Default background-repeat utility values matching Tailwind CSS.
 */
export const defaultBackgroundRepeatValues = {
	repeat: "repeat",
	"no-repeat": "no-repeat",
	"repeat-x": "repeat-x",
	"repeat-y": "repeat-y",
	round: "round",
	space: "space",
};

/**
 * Create background-repeat utility classes.
 */
export const useBackgroundRepeatUtility = createUseUtility(
	"background-repeat",
	({ value }) => ({
		backgroundRepeat: value,
	}),
	{ defaults: defaultBackgroundRepeatValues },
);
