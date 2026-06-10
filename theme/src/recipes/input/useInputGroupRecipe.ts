import { createFieldGroupRecipe } from "./createFieldRecipe";

/**
 * Input group recipe — a pure layout coordinator for an `.input` flanked by
 * transparent `input-prepend` / `input-append` slots. The group paints no
 * border or background of its own; the nested `.input` wrapper keeps its
 * own visual field. The group's only job is to flatten the border-radius
 * at the seams where prepend/append meet the input.
 */
export const useInputGroupRecipe = createFieldGroupRecipe("input");
