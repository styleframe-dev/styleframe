import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Toast progress recipe — a prominent duration indicator that reads as a
 * countdown at a glance. It scales from full width to zero over
 * `--toast-duration` (default 5s), mirroring the auto-dismiss countdown. Pure
 * CSS: the recipe owns the keyframes and reads the duration from a custom
 * property, so nothing has to flip a data-attribute at runtime — declarative
 * and driftless.
 *
 * The bar is a rounded pill inset from the toast's rounded corners rather than
 * bleeding edge-to-edge, and uses `currentColor` at full opacity so it inherits
 * each toast color/variant's foreground accent automatically across all 27
 * combinations.
 */
export const useToastProgressRecipe = createUseRecipe(
	"toast-progress",
	{
		base: {
			position: "absolute",
			bottom: "@0.5",
			left: "@0.5",
			right: "@0.5",
			height: "@0.25",
			transformOrigin: "left center",
			background: "currentColor",
			borderRadius: "@border-radius.full",
			animationName: "toast-progress",
			animationDuration: "var(--toast-duration, 5s)",
			animationTimingFunction: "linear",
		},
	},
	(s) => {
		s.keyframes("toast-progress", {
			"0%": { transform: "scaleX(1)" },
			"100%": { transform: "scaleX(0)" },
		});
	},
);
