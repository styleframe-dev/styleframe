import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Toast icon recipe for the leading icon slot.
 */
export const useToastIconRecipe = createUseRecipe("toast-icon", {
	base: {
		display: "inline-flex",
		flexShrink: "0",
	},
});
