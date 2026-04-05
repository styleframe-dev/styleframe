import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Modal overlay recipe for the backdrop behind the modal.
 */
export const useModalOverlayRecipe = createUseRecipe("modal-overlay", {
	base: {
		position: "fixed",
		top: "0",
		right: "0",
		bottom: "0",
		left: "0",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		background: "rgba(0, 0, 0, 0.75)",
		zIndex: "1000",
	},
	variants: {},
	compoundVariants: [],
	defaultVariants: {},
});
