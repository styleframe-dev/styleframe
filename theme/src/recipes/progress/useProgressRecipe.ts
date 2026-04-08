import { createUseRecipe } from "../../utils/createUseRecipe";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"error",
] as const;

/**
 * Progress track recipe with non-semantic color variants.
 * Provides the neutral background container for the progress bar fill.
 */
export const useProgressRecipe = createUseRecipe("progress", {
	base: {
		display: "flex",
		width: "100%",
		overflow: "hidden",
		borderRadius: "@border-radius.md",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		size: {
			xs: {
				height: "@0.25",
				borderRadius: "@border-radius.sm",
			},
			sm: {
				height: "@0.375",
				borderRadius: "@border-radius.sm",
			},
			md: {
				height: "@0.5",
				borderRadius: "@border-radius.md",
			},
			lg: {
				height: "@0.75",
				borderRadius: "@border-radius.md",
			},
			xl: {
				height: "@1",
				borderRadius: "@border-radius.lg",
			},
		},
	},
	compoundVariants: [
		// Light — fixed across themes
		{
			match: { color: "light" as const },
			css: {
				background: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-200",
				},
			},
		},

		// Dark — fixed across themes
		{
			match: { color: "dark" as const },
			css: {
				background: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-700",
				},
			},
		},

		// Neutral — adaptive (different light/dark values)
		{
			match: { color: "neutral" as const },
			css: {
				background: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-800",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		size: "md",
	},
});

/**
 * Progress bar fill recipe with semantic and non-semantic color variants.
 * Represents the colored fill indicator inside the progress track.
 */
export const useProgressBarRecipe = createUseRecipe("progress-bar", {
	base: {
		height: "100%",
		borderRadius: "@border-radius.md",
		transitionProperty: "width",
		transitionTimingFunction: "@easing.ease-in-out",
		transitionDuration: "300ms",
	},
	variants: {
		color: {
			primary: {},
			secondary: {},
			success: {},
			info: {},
			warning: {},
			error: {},
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			solid: {},
		},
		size: {
			xs: {
				borderRadius: "@border-radius.sm",
			},
			sm: {
				borderRadius: "@border-radius.sm",
			},
			md: {
				borderRadius: "@border-radius.md",
			},
			lg: {
				borderRadius: "@border-radius.md",
			},
			xl: {
				borderRadius: "@border-radius.lg",
			},
		},
	},
	compoundVariants: [
		// Semantic colors (dynamic)
		...colors.flatMap((color) => [
			{
				match: { color, variant: "solid" as const },
				css: {
					background: `@color.${color}`,
				},
			},
		]),

		// Light — fixed across themes
		{
			match: { color: "light" as const, variant: "solid" as const },
			css: {
				background: "@color.gray-400",
				"&:dark": {
					background: "@color.gray-400",
				},
			},
		},

		// Dark — fixed across themes
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				background: "@color.gray-500",
				"&:dark": {
					background: "@color.gray-500",
				},
			},
		},

		// Neutral — adaptive (different light/dark values)
		{
			match: { color: "neutral" as const, variant: "solid" as const },
			css: {
				background: "@color.gray-400",
				"&:dark": {
					background: "@color.gray-500",
				},
			},
		},
	],
	defaultVariants: {
		color: "primary",
		variant: "solid",
		size: "md",
	},
});
