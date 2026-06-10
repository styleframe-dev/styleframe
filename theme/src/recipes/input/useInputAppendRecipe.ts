import { createFieldSlotRecipe } from "./createFieldRecipe";

/**
 * Input append recipe — transparent trailing slot inside an input group.
 * Owns no background, border, or padding. Slot content (a Button,
 * dropdown, plain text, ...) brings its own visual language; the
 * `input-group` wrapper provides the shared field surface behind it.
 */
export const useInputAppendRecipe = createFieldSlotRecipe("input-append");
