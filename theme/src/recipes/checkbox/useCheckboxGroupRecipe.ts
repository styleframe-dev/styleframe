import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Checkbox group recipe — a flex container that lays out multiple `.checkbox`
 * rows. Supports orientation (vertical / horizontal) and a size axis that
 * controls the gap between items.
 */
export const useCheckboxGroupRecipe = createUseRecipe("checkbox-group", {
	base: {
		display: "flex",
	},
	variants: {
		orientation: {
			vertical: {
				flexDirection: "column",
			},
			horizontal: {
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
			},
		},
		size: {
			sm: {
				gap: "@0.5",
			},
			md: {
				gap: "@0.75",
			},
			lg: {
				gap: "@1",
			},
		},
	},
	defaultVariants: {
		orientation: "vertical",
		size: "md",
	},
});
