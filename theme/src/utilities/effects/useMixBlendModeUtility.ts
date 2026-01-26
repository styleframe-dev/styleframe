import { createUseUtility } from "../../utils";
import { mixBlendModeValues } from "../../values";

/**
 * Create mix-blend-mode utility classes.
 */
export const useMixBlendModeUtility = createUseUtility(
	"mix-blend-mode",
	({ value }) => ({
		mixBlendMode: value,
	}),
	{ defaults: mixBlendModeValues },
);
