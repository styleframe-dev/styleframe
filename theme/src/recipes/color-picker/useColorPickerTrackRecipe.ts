import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Color picker track recipe — the narrow vertical hue slider.
 *
 * Paints the full 0→360° hue rainbow (a fixed color-model gradient, so the
 * stops are intentionally literal). Width is constant; height tracks the
 * selector's height per size so the two parts align. Drop a
 * `.color-picker-thumb` inside and position it vertically to mark the hue.
 */
export const useColorPickerTrackRecipe = createUseRecipe(
	"color-picker-track",
	{
		base: {
			position: "relative",
			width: "@0.5",
			borderRadius: "@border-radius.md",
		},
		variants: {
			size: {
				xs: { height: "@9.5" },
				sm: { height: "@10" },
				md: { height: "@10.5" },
				lg: { height: "@11" },
				xl: { height: "@11.5" },
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
	(s) => {
		s.selector(".color-picker-track", {
			touchAction: "none",
			background:
				"linear-gradient(to bottom, hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%), hsl(180 100% 50%), hsl(240 100% 50%), hsl(300 100% 50%), hsl(360 100% 50%))",
		});
	},
);
