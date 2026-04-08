import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Popover arrow recipe using rotated-square technique.
 * Arrow color mirrors the popover container's background and border.
 */
export const usePopoverArrowRecipe = createUseRecipe("popover-arrow", {
	base: {
		position: "absolute",
		width: "@0.5",
		height: "@0.5",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		transform: "rotate(45deg)",
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
				width: "@0.375",
				height: "@0.375",
			},
			md: {
				width: "@0.5",
				height: "@0.5",
			},
			lg: {
				width: "@0.625",
				height: "@0.625",
			},
		},
	},
	compoundVariants: [
		// Light color (fixed across themes)
		{
			match: { color: "light" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				borderColor: "@color.gray-200",
				"&:dark": {
					background: "@color.white",
					borderColor: "@color.gray-200",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "soft" as const },
			css: {
				background: "@color.gray-100",
				"&:dark": {
					background: "@color.gray-100",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "subtle" as const },
			css: {
				background: "@color.gray-100",
				borderColor: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-100",
					borderColor: "@color.gray-200",
				},
			},
		},

		// Dark color (fixed across themes)
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				background: "@color.gray-900",
				borderColor: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-900",
					borderColor: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "soft" as const },
			css: {
				background: "@color.gray-800",
				"&:dark": {
					background: "@color.gray-800",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "subtle" as const },
			css: {
				background: "@color.gray-800",
				borderColor: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-800",
					borderColor: "@color.gray-700",
				},
			},
		},

		// Neutral color (adaptive: light in light mode, dark in dark mode)
		{
			match: { color: "neutral" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				borderColor: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-900",
					borderColor: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "soft" as const },
			css: {
				background: "@color.gray-100",
				"&:dark": {
					background: "@color.gray-800",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "subtle" as const },
			css: {
				background: "@color.gray-100",
				borderColor: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-800",
					borderColor: "@color.gray-700",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
});
