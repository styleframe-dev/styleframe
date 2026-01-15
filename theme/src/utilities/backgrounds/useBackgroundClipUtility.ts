import { createUseUtility } from "../../utils";

/**
 * Default background-clip utility values matching Tailwind CSS.
 */
export const defaultBackgroundClipValues = {
	border: "border-box",
	padding: "padding-box",
	content: "content-box",
	text: "text",
};

/**
 * Create background-clip utility classes.
 */
export const useBackgroundClipUtility = createUseUtility(
	"background-clip",
	({ value }) => ({
		backgroundClip: value,
	}),
	{ defaults: defaultBackgroundClipValues },
);
