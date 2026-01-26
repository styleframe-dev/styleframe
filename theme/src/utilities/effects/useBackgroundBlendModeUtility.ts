import { createUseUtility } from "../../utils";
import { backgroundBlendModeValues } from "../../values";

/**
 * Create background-blend-mode utility classes.
 */
export const useBackgroundBlendModeUtility = createUseUtility(
	"background-blend-mode",
	({ value }) => ({
		backgroundBlendMode: value,
	}),
	{ defaults: backgroundBlendModeValues },
);
