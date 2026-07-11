import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Toast progress recipe — a thin duration indicator pinned to the toast's
 * bottom edge. It scales from full width to zero over `--toast-duration`
 * (default 5s), mirroring the auto-dismiss countdown. Pure CSS: the recipe
 * owns the keyframes and reads the duration from a custom property, so nothing
 * has to flip a data-attribute at runtime — declarative and driftless.
 *
 * The line uses `currentColor`, so it inherits each toast color/variant's
 * foreground automatically across all 36 combinations.
 */
export const useToastProgressRecipe = createUseRecipe(
	"toast-progress",
	{
		base: {
			position: "absolute",
			bottom: "0",
			left: "0",
			width: "100%",
			height: "@0.125",
			transformOrigin: "left center",
			background: "currentColor",
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
