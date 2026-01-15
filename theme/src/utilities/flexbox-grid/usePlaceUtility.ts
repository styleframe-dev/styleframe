import { createUseUtility } from "../../utils";

/**
 * Default place-content utility values matching Tailwind CSS.
 */
export const defaultPlaceContentValues = {
	center: "center",
	start: "start",
	end: "end",
	between: "space-between",
	around: "space-around",
	evenly: "space-evenly",
	baseline: "baseline",
	stretch: "stretch",
};

/**
 * Default place-items utility values matching Tailwind CSS.
 */
export const defaultPlaceItemsValues = {
	start: "start",
	end: "end",
	center: "center",
	baseline: "baseline",
	stretch: "stretch",
};

/**
 * Default place-self utility values matching Tailwind CSS.
 */
export const defaultPlaceSelfValues = {
	auto: "auto",
	start: "start",
	end: "end",
	center: "center",
	stretch: "stretch",
};

/**
 * Create place-content utility classes.
 */
export const usePlaceContentUtility = createUseUtility(
	"place-content",
	({ value }) => ({
		placeContent: value,
	}),
	{ defaults: defaultPlaceContentValues },
);

/**
 * Create place-items utility classes.
 */
export const usePlaceItemsUtility = createUseUtility(
	"place-items",
	({ value }) => ({
		placeItems: value,
	}),
	{ defaults: defaultPlaceItemsValues },
);

/**
 * Create place-self utility classes.
 */
export const usePlaceSelfUtility = createUseUtility(
	"place-self",
	({ value }) => ({
		placeSelf: value,
	}),
	{ defaults: defaultPlaceSelfValues },
);
