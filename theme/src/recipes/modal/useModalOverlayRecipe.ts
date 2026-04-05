import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Modal overlay/backdrop recipe.
 */
export const useModalOverlayRecipe = createUseRecipe("modal-overlay", {
	base: {
		position: "fixed",
		top: "0",
		left: "0",
		width: "100%",
		height: "100%",
		background: "rgba(0, 0, 0, 0.5)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		zIndex: "@z-index.modal",
		"&:dark": {
			background: "rgba(0, 0, 0, 0.7)",
		},
	},
	variants: {},
	defaultVariants: {},
});
