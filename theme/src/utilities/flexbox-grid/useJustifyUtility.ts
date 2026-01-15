import { createUseUtility } from "../../utils";

/**
 * Default justify-content utility values matching Tailwind CSS.
 */
export const defaultJustifyContentValues = {
	normal: "normal",
	start: "flex-start",
	end: "flex-end",
	center: "center",
	between: "space-between",
	around: "space-around",
	evenly: "space-evenly",
	stretch: "stretch",
};

/**
 * Default justify-items utility values matching Tailwind CSS.
 */
export const defaultJustifyItemsValues = {
	start: "start",
	end: "end",
	center: "center",
	stretch: "stretch",
};

/**
 * Default justify-self utility values matching Tailwind CSS.
 */
export const defaultJustifySelfValues = {
	auto: "auto",
	start: "start",
	end: "end",
	center: "center",
	stretch: "stretch",
};

/**
 * Create justify-content utility classes.
 */
export const useJustifyContentUtility = createUseUtility(
	"justify",
	({ value }) => ({
		justifyContent: value,
	}),
	{ defaults: defaultJustifyContentValues },
);

/**
 * Create justify-items utility classes.
 */
export const useJustifyItemsUtility = createUseUtility(
	"justify-items",
	({ value }) => ({
		justifyItems: value,
	}),
	{ defaults: defaultJustifyItemsValues },
);

/**
 * Create justify-self utility classes.
 */
export const useJustifySelfUtility = createUseUtility(
	"justify-self",
	({ value }) => ({
		justifySelf: value,
	}),
	{ defaults: defaultJustifySelfValues },
);
