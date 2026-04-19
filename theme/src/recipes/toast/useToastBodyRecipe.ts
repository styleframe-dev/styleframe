import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Toast body recipe for the content area of a toast notification.
 */
export const useToastBodyRecipe = createUseRecipe("toast-body", {
	base: {
		flex: "1",
		minWidth: "0",
	},
	variants: {},
	compoundVariants: [],
	defaultVariants: {},
});
