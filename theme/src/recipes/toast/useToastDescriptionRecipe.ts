import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Toast description recipe — the supporting line below the title. A step down
 * in size and weight from the title, with a small top margin to separate the
 * two lines. Colour is inherited (`currentColor`) — the neutral foreground of
 * the toast body, never the `color` accent. The lower-contrast reading relative
 * to the title comes from the weight/size step, which is colour-agnostic and
 * driftless.
 *
 * The title has no explicit font-size, so it inherits the toast root, which
 * scales with the `size` axis (sm → xs, md → sm, lg → md). The description must
 * track that axis too, always one step below the title so the hierarchy holds
 * at every size — hence a `size` axis here that mirrors the root, offset one
 * token down: sm → 2xs, md → xs, lg → sm. Defaults to `md` to match the toast.
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
			sm: { fontSize: "@font-size.2xs" },
			md: { fontSize: "@font-size.xs" },
			lg: { fontSize: "@font-size.sm" },
		},
	},
	defaultVariants: {
		size: "md",
	},
});
