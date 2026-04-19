import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Dropdown divider recipe for visual separation between menu items.
 * Supports color (light, dark, neutral) and variant axes.
 */
export const useDropdownDividerRecipe = createUseRecipe("dropdown-divider", {
	base: {
		borderTopWidth: "@border-width.thin",
		borderTopStyle: "@border-style.solid",
		borderTopColor: "transparent",
		marginTop: "@0.25",
		marginBottom: "@0.25",
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
	},
	compoundVariants: [
		// Light color (fixed across themes)
		{
			match: { color: "light" as const, variant: "solid" as const },
			css: {
				borderTopColor: "@color.gray-200",
				"&:dark": {
					borderTopColor: "@color.gray-200",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "soft" as const },
			css: {
				borderTopColor: "@color.gray-200",
				"&:dark": {
					borderTopColor: "@color.gray-200",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "subtle" as const },
			css: {
				borderTopColor: "@color.gray-200",
				"&:dark": {
					borderTopColor: "@color.gray-200",
				},
			},
		},

		// Dark color (fixed across themes)
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				borderTopColor: "@color.gray-700",
				"&:dark": {
					borderTopColor: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "soft" as const },
			css: {
				borderTopColor: "@color.gray-700",
				"&:dark": {
					borderTopColor: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "subtle" as const },
			css: {
				borderTopColor: "@color.gray-700",
				"&:dark": {
					borderTopColor: "@color.gray-700",
				},
			},
		},

		// Neutral color (adaptive: light in light mode, dark in dark mode)
		{
			match: { color: "neutral" as const, variant: "solid" as const },
			css: {
				borderTopColor: "@color.gray-200",
				"&:dark": {
					borderTopColor: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "soft" as const },
			css: {
				borderTopColor: "@color.gray-200",
				"&:dark": {
					borderTopColor: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "subtle" as const },
			css: {
				borderTopColor: "@color.gray-200",
				"&:dark": {
					borderTopColor: "@color.gray-700",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
	},
});
