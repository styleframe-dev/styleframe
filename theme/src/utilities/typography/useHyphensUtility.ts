import { createUseUtility } from "../../utils";
import { hyphensValues } from "../../values";

/**
 * Create hyphens utility classes.
 */
export const useHyphensUtility = createUseUtility(
	"hyphens",
	({ value }) => ({
		hyphens: value,
	}),
	{ defaults: hyphensValues },
);
