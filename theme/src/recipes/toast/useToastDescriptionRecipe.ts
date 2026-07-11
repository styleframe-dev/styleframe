import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Toast description recipe — the supporting line below the title. A step down
 * in size and weight from the title, with a small top margin to separate the
 * two lines. Colour is inherited (`currentColor`) — the neutral foreground of
 * the toast body, never the `color` accent. The lower-contrast reading relative
 * to the title comes from the weight/size step, which is colour-agnostic and
 * driftless.
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
