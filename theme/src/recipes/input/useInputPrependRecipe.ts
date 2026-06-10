import { createFieldSlotRecipe } from "./createFieldRecipe";

/**
 * Input prepend recipe — transparent leading slot inside an input group.
 * Owns no background, border, or padding. Slot content (a Button,
 * dropdown, plain text, ...) brings its own visual language; the
 * `input-group` wrapper provides the shared field surface behind it.
 */
export const useInputPrependRecipe = createFieldSlotRecipe("input-prepend");
