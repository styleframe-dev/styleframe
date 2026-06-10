import { createFieldGroupRecipe } from "../input/createFieldRecipe";

/**
 * Textarea group recipe — a pure layout coordinator for a `.textarea` flanked by
 * transparent `textarea-prepend` / `textarea-append` slots. The group paints no
 * border or background of its own; the nested `.textarea` wrapper keeps its own
 * visual field. The group's only job is to flatten the border-radius at the
 * seams where prepend/append meet the textarea.
 */
export const useTextareaGroupRecipe = createFieldGroupRecipe("textarea");
