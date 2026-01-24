import { createUseUtility } from "../../utils";

/**
 * Default align-content utility values matching Tailwind CSS.
 */
export const defaultAlignContentValues = {
	normal: "normal",
	center: "center",
	start: "flex-start",
	end: "flex-end",
	between: "space-between",
	around: "space-around",
	evenly: "space-evenly",
	baseline: "baseline",
	stretch: "stretch",
};

/**
 * Default align-items utility values matching Tailwind CSS.
 */
export const defaultAlignItemsValues = {
	start: "flex-start",
	end: "flex-end",
	center: "center",
	baseline: "baseline",
	stretch: "stretch",
};

/**
 * Default align-self utility values matching Tailwind CSS.
 */
export const defaultAlignSelfValues = {
	auto: "auto",
	start: "flex-start",
	end: "flex-end",
	center: "center",
	stretch: "stretch",
	baseline: "baseline",
};

/**
 * Create align-content utility classes.
 */
export const useAlignContentUtility = createUseUtility(
	"align-content",
	({ value }) => ({
		alignContent: value,
	}),
	{ defaults: defaultAlignContentValues },
);

/**
 * Create align-items utility classes.
 */
export const useAlignItemsUtility = createUseUtility(
	"align-items",
	({ value }) => ({
		alignItems: value,
	}),
	{ defaults: defaultAlignItemsValues },
);

/**
 * Create align-self utility classes.
 */
export const useAlignSelfUtility = createUseUtility(
	"align-self",
	({ value }) => ({
		alignSelf: value,
	}),
	{ defaults: defaultAlignSelfValues },
);
