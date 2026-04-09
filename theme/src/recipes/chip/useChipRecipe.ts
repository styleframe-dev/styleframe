import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Chip wrapper recipe that establishes the positioning context for the chip indicator.
 */
export const useChipRecipe = createUseRecipe("chip", {
	base: {
		position: "relative",
		display: "inline-flex",
	},
	variants: {},
	compoundVariants: [],
	defaultVariants: {},
});
