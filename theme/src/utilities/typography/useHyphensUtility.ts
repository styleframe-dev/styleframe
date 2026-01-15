import { createUseUtility } from "../../utils";

/**
 * Default hyphens utility values matching Tailwind CSS.
 */
export const defaultHyphensValues = {
	none: "none",
	manual: "manual",
	auto: "auto",
};

/**
 * Create hyphens utility classes.
 */
export const useHyphensUtility = createUseUtility(
	"hyphens",
	({ value }) => ({
		hyphens: value,
	}),
	{ defaults: defaultHyphensValues },
);
