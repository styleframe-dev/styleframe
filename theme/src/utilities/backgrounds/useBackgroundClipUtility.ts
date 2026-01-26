import { createUseUtility } from "../../utils";
import { backgroundClipValues } from "../../values";

/**
 * Create background-clip utility classes.
 */
export const useBackgroundClipUtility = createUseUtility(
	"background-clip",
	({ value }) => ({
		backgroundClip: value,
	}),
	{ defaults: backgroundClipValues },
);
