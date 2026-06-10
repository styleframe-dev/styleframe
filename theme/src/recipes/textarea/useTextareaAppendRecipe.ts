import { createFieldSlotRecipe } from "../input/createFieldRecipe";

/**
 * Textarea append recipe — transparent trailing slot inside a textarea group.
 * Owns no background, border, or padding. Slot content (a Button, dropdown,
 * plain text, ...) brings its own visual language; the `textarea-group`
 * coordinates the shared field surface behind it.
 */
export const useTextareaAppendRecipe = createFieldSlotRecipe("textarea-append");
