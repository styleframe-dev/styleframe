import { createUseUtility } from "../../utils";
import { backgroundAttachmentValues } from "../../values";

/**
 * Create background-attachment utility classes.
 */
export const useBackgroundAttachmentUtility = createUseUtility(
	"background-attachment",
	({ value }) => ({
		backgroundAttachment: value,
	}),
	{ defaults: backgroundAttachmentValues },
);
