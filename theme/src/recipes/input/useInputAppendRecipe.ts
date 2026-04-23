import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Input append recipe — transparent trailing slot inside an input group.
 * Owns no background, border, or padding. Slot content (a Button,
 * dropdown, plain text, ...) brings its own visual language; the
 * `input-group` wrapper provides the shared field surface behind it.
 */
export const useInputAppendRecipe = createUseRecipe("input-append", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		flexShrink: "0",
	},
});
