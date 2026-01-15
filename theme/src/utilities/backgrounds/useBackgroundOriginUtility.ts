import { createUseUtility } from "../../utils";

/**
 * Default background-origin utility values matching Tailwind CSS.
 */
export const defaultBackgroundOriginValues = {
	border: "border-box",
	padding: "padding-box",
	content: "content-box",
};

/**
 * Create background-origin utility classes.
 */
export const useBackgroundOriginUtility = createUseUtility(
	"background-origin",
	({ value }) => ({
		backgroundOrigin: value,
	}),
	{ defaults: defaultBackgroundOriginValues },
);
