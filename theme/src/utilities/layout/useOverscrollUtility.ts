import { createUseUtility } from "../../utils";

/**
 * Default overscroll-behavior utility values matching Tailwind CSS.
 */
export const defaultOverscrollValues = {
	auto: "auto",
	contain: "contain",
	none: "none",
};

/**
 * Create overscroll-behavior utility classes.
 */
export const useOverscrollUtility = createUseUtility(
	"overscroll",
	({ value }) => ({
		overscrollBehavior: value,
	}),
	{ defaults: defaultOverscrollValues },
);

/**
 * Create overscroll-behavior-x utility classes.
 */
export const useOverscrollXUtility = createUseUtility(
	"overscroll-x",
	({ value }) => ({
		overscrollBehaviorX: value,
	}),
	{ defaults: defaultOverscrollValues },
);

/**
 * Create overscroll-behavior-y utility classes.
 */
export const useOverscrollYUtility = createUseUtility(
	"overscroll-y",
	({ value }) => ({
		overscrollBehaviorY: value,
	}),
	{ defaults: defaultOverscrollValues },
);
