import { createFieldRecipe } from "../input/createFieldRecipe";

/**
 * InputDate wrapper recipe. The `.input-date` class sits on a wrapper element
 * that contains an optional inline `#prefix`/`#suffix` slot (reusing the Input
 * prefix/suffix recipes for a leading calendar icon) and a nested
 * `<span class="input-date-field">` that lays out the editable date/time
 * segments (`.input-date-segment`) and separators (`.input-date-separator`).
 * The wrapper owns the visual field (border, background, padding, focus ring via
 * `:focus-within`); the inner segments are transparent and inherit typography.
 *
 * A member of the field recipes family — color (light, dark, neutral), variant
 * (default, soft, ghost), size, and the `invalid` / `disabled` / `readonly`
 * boolean axes — built from the shared field surface in
 * `../input/createFieldRecipe`; the wrapper sits inline (inline-flex, vertically
 * centered). Calendar/popover styling is out of scope (see the `calendar`
 * recipe). The setup callback turns the shared `.input-date-field` reset into a
 * horizontal flex row for the segments and registers the muted separator glyph.
 */
export const useInputDateRecipe = createFieldRecipe(
	"input-date",
	{
		base: {
			display: "inline-flex",
			alignItems: "center",
		},
	},
	(s) => {
		const { selector, css, ref } = s;

		// 0.125 of the base spacing step. Inlined as a calc rather than referenced
		// as "@0.125" because raw selectors don't auto-declare numeric multiplier
		// variables (same pattern as the calendar recipe).
		const spacingHalfQuarter = css`calc(${ref("spacing")} * 0.125)`;

		// Lay the segments + separators out as a horizontal row inside the
		// shared transparent field container.
		selector(".input-date-field", {
			display: "flex",
			alignItems: "center",
			gap: spacingHalfQuarter,
		});

		// Muted, non-selectable date/range separator glyph (e.g. "/" or "–").
		selector(".input-date-separator", {
			color: "@color.text-weak",
			userSelect: "none",
			paddingLeft: spacingHalfQuarter,
			paddingRight: spacingHalfQuarter,
			"&:dark": {
				color: "@color.gray-400",
			},
		});
	},
);
