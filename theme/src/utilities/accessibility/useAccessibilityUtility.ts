import { createUseUtility } from "../../utils";
import { forcedColorAdjustValues } from "../../values";

/**
 * Create forced-color-adjust utility classes.
 */
export const useForcedColorAdjustUtility = createUseUtility(
	"forced-color-adjust",
	({ value }) => ({
		forcedColorAdjust: value,
	}),
	{ defaults: forcedColorAdjustValues },
);

/**
 * Create screen-reader only utility class.
 * Visually hides an element while keeping it accessible to screen readers.
 */
export const useSrOnlyUtility = createUseUtility(
	"sr-only",
	() => ({
		position: "absolute",
		width: "1px",
		height: "1px",
		padding: "0",
		margin: "-1px",
		overflow: "hidden",
		clip: "rect(0, 0, 0, 0)",
		whiteSpace: "nowrap",
		borderWidth: "0",
	}),
	{
		defaults: {
			default: true,
		},
	},
);

/**
 * Create not-sr-only utility class.
 * Undoes the sr-only utility.
 */
export const useNotSrOnlyUtility = createUseUtility(
	"not-sr-only",
	() => ({
		position: "static",
		width: "auto",
		height: "auto",
		padding: "0",
		margin: "0",
		overflow: "visible",
		clip: "auto",
		whiteSpace: "normal",
	}),
	{
		defaults: {
			default: true,
		},
	},
);
