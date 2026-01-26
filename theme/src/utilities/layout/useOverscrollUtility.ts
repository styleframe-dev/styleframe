import { createUseUtility } from "../../utils";
import { overscrollValues } from "../../values";

/**
 * Create overscroll-behavior utility classes.
 */
export const useOverscrollUtility = createUseUtility(
	"overscroll",
	({ value }) => ({
		overscrollBehavior: value,
	}),
	{ defaults: overscrollValues },
);

/**
 * Create overscroll-behavior-x utility classes.
 */
export const useOverscrollXUtility = createUseUtility(
	"overscroll-x",
	({ value }) => ({
		overscrollBehaviorX: value,
	}),
	{ defaults: overscrollValues },
);

/**
 * Create overscroll-behavior-y utility classes.
 */
export const useOverscrollYUtility = createUseUtility(
	"overscroll-y",
	({ value }) => ({
		overscrollBehaviorY: value,
	}),
	{ defaults: overscrollValues },
);
