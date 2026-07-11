import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Toast title recipe — the headline line of the toast. Semibold and snug so it
 * reads as the dominant element above the description. Colour is inherited
 * (`currentColor`) so the title respects each variant's foreground rather than
 * fighting it; the hierarchy against the description is carried by weight and
 * size, which holds on every variant including the filled `solid` surfaces.
 */
export const useToastTitleRecipe = createUseRecipe("toast-title", {
	base: {
		display: "block",
		fontWeight: "@font-weight.semibold",
		lineHeight: "@line-height.snug",
	},
});
