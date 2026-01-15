import { createUseUtility } from "../../utils";

/**
 * Default flex-wrap utility values matching Tailwind CSS.
 */
export const defaultFlexWrapValues = {
	wrap: "wrap",
	"wrap-reverse": "wrap-reverse",
	nowrap: "nowrap",
};

/**
 * Create flex-wrap utility classes.
 */
export const useFlexWrapUtility = createUseUtility(
	"flex-wrap",
	({ value }) => ({
		flexWrap: value,
	}),
	{ defaults: defaultFlexWrapValues },
);
