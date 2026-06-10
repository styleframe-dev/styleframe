import { createFieldSlotRecipe } from "../input/createFieldRecipe";

/**
 * Textarea prepend recipe — transparent leading slot inside a textarea group.
 * Owns no background, border, or padding. Slot content (a Button, dropdown,
 * plain text, ...) brings its own visual language; the `textarea-group`
 * coordinates the shared field surface behind it.
 */
export const useTextareaPrependRecipe =
	createFieldSlotRecipe("textarea-prepend");
