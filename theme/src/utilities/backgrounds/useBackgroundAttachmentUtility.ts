import { createUseUtility } from "../../utils";

/**
 * Default background-attachment utility values matching Tailwind CSS.
 */
export const defaultBackgroundAttachmentValues = {
	fixed: "fixed",
	local: "local",
	scroll: "scroll",
};

/**
 * Create background-attachment utility classes.
 */
export const useBackgroundAttachmentUtility = createUseUtility(
	"background-attachment",
	({ value }) => ({
		backgroundAttachment: value,
	}),
	{ defaults: defaultBackgroundAttachmentValues },
);
