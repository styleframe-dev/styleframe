import { createFieldRecipe } from "./createFieldRecipe";

/**
 * Input wrapper recipe. The `.input` class sits on a wrapper element that
 * contains an inline `#prefix` slot, a nested `<input class="input-field">`,
 * and an inline `#suffix` slot. The wrapper owns the visual field (border,
 * background, padding, focus ring via `:focus-within`); the nested input is
 * transparent and inherits typography.
 *
 * Supports color (light, dark, neutral), variant (default, soft, ghost),
 * size, and three boolean axes — `invalid`, `disabled`, `readonly` — that
 * map to the equivalent native `<input>` attributes from the consumer.
 *
 * Built from the shared field surface in `./createFieldRecipe`; the input
 * wrapper sits inline (inline-flex, vertically centered).
 */
export const useInputRecipe = createFieldRecipe("input", {
	base: {
		display: "inline-flex",
		alignItems: "center",
	},
});
