import { createUseUtility } from "../../utils";

/**
 * Default text-wrap utility values matching Tailwind CSS.
 */
export const defaultTextWrapValues = {
	wrap: "wrap",
	nowrap: "nowrap",
	balance: "balance",
	pretty: "pretty",
};

/**
 * Create text-wrap utility classes.
 */
export const useTextWrapUtility = createUseUtility(
	"text-wrap",
	({ value }) => ({
		textWrap: value,
	}),
	{ defaults: defaultTextWrapValues },
);
