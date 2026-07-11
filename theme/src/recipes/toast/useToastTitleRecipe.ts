import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Toast title recipe — the headline line of the toast. Semibold and snug so it
 * reads as the dominant element above the description. Colour is inherited
 * (`currentColor`), which on the neutral toast body is the neutral foreground
 * token — the title is never tinted by the toast's `color` (that accent lives
 * on the icon and progress bar). The hierarchy against the description is
 * carried by weight and size, not colour, so it holds across every surface.
 */
export const useToastTitleRecipe = createUseRecipe("toast-title", {
	base: {
		display: "block",
		fontWeight: "@font-weight.semibold",
		lineHeight: "@line-height.snug",
	},
});
