import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Toast description recipe — the supporting line below the title. A step down
 * in size and weight from the title, with a small top margin to separate the
 * two lines. Colour is inherited (`currentColor`) so it respects each variant's
 * foreground; the lower-contrast reading relative to the title comes from the
 * weight/size step, which is variant-agnostic and driftless.
 */
export const useToastDescriptionRecipe = createUseRecipe("toast-description", {
	base: {
		display: "block",
		marginTop: "@0.25",
		fontSize: "@font-size.xs",
		fontWeight: "@font-weight.normal",
		lineHeight: "@line-height.normal",
	},
});
