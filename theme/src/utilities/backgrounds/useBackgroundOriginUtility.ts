import { createUseUtility } from "../../utils";
import { backgroundOriginValues } from "../../values";

/**
 * Create background-origin utility classes.
 */
export const useBackgroundOriginUtility = createUseUtility(
	"background-origin",
	({ value }) => ({
		backgroundOrigin: value,
	}),
	{ defaults: backgroundOriginValues },
);
