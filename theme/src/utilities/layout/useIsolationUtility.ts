import { createUseUtility } from "../../utils";

/**
 * Default isolation utility values matching Tailwind CSS.
 */
export const defaultIsolationValues = {
	isolate: "isolate",
	auto: "auto",
};

/**
 * Create isolation utility classes.
 */
export const useIsolationUtility = createUseUtility(
	"isolation",
	({ value }) => ({
		isolation: value,
	}),
	{ defaults: defaultIsolationValues },
);
