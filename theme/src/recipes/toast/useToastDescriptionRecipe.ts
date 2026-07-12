import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Toast description recipe — the supporting line below the title. A step down
 * in weight from the title, with a small top margin to separate the two lines.
 * Colour is inherited (`currentColor`) — the neutral foreground of the toast
 * body, never the `color` accent. The lower-contrast reading relative to the
 * title comes from the weight step alone, which is colour-agnostic and
 * driftless.
 *
 * Font size follows the `size` axis on the literal token — sm → sm, md → md,
 * lg → lg — matching `useToastTitleRecipe` exactly, so title and description
 * are equal in size at every step and the hierarchy is carried by weight
 * (semibold title vs normal description). Defaults to `md` to match the toast.
 */
export const useToastDescriptionRecipe = createUseRecipe("toast-description", {
	base: {
		display: "block",
		marginTop: "@0.25",
		fontWeight: "@font-weight.normal",
		lineHeight: "@line-height.normal",
	},
	variants: {
		size: {
			sm: { fontSize: "@font-size.sm" },
			md: { fontSize: "@font-size.md" },
			lg: { fontSize: "@font-size.lg" },
		},
	},
	defaultVariants: {
		size: "md",
	},
});
