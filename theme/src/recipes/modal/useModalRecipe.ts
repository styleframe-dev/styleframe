import { createUseRecipe } from "../../utils/createUseRecipe";
import { overlaySurfaceCompoundVariants } from "./createOverlayRecipes";

/**
 * Modal container recipe.
 * Supports color (light, dark, neutral), variant, and size axes.
 */
export const useModalRecipe = createUseRecipe("modal", {
	base: {
		display: "flex",
		flexDirection: "column",
		flexBasis: "100%",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		borderRadius: "@border-radius.md",
		overflow: "hidden",
		lineHeight: "@line-height.normal",
		boxShadow: "@box-shadow.sm",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			solid: {},
			soft: {},
			subtle: {},
		},
		size: {
			sm: {
				borderRadius: "@border-radius.sm",
			},
			md: {
				borderRadius: "@border-radius.md",
			},
			lg: {
				borderRadius: "@border-radius.lg",
			},
		},
		fullscreen: {
			true: {
				width: "100%",
				height: "100%",
				maxWidth: "none",
				borderRadius: "0",
			},
			false: {},
		},
	},
	compoundVariants: [...overlaySurfaceCompoundVariants],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
		fullscreen: "false",
	},
});
