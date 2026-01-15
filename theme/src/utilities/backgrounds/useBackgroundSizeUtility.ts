import { createUseUtility } from "../../utils";

/**
 * Default background-size utility values matching Tailwind CSS.
 */
export const defaultBackgroundSizeValues = {
	auto: "auto",
	cover: "cover",
	contain: "contain",
};

/**
 * Create background-size utility classes.
 */
export const useBackgroundSizeUtility = createUseUtility(
	"background-size",
	({ value }) => ({
		backgroundSize: value,
	}),
	{ defaults: defaultBackgroundSizeValues },
);
