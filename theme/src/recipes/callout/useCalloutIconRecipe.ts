import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Callout icon recipe for the leading icon slot.
 */
export const useCalloutIconRecipe = createUseRecipe("callout-icon", {
	base: {
		display: "inline-flex",
		flexShrink: "0",
	},
});
