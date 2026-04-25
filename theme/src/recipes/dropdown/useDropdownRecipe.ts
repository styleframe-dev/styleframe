import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Dropdown container recipe for menu-style floating panels.
 * Supports color (light, dark, neutral), variant (solid, soft, subtle), and size axes.
 */
export const useDropdownRecipe = createUseRecipe("dropdown", {
	base: {
		display: "flex",
		flexDirection: "column",
		flexBasis: "100%",
		minWidth: "@12",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		borderRadius: "@border-radius.md",
		lineHeight: "@line-height.normal",
		boxShadow: "@box-shadow.md",
		zIndex: "@z-index.dropdown",
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
				paddingTop: "@0.125",
				paddingBottom: "@0.125",
				paddingLeft: "@0.125",
				paddingRight: "@0.125",
				borderRadius: "@border-radius.sm",
			},
			md: {
				paddingTop: "@0.25",
				paddingBottom: "@0.25",
				paddingLeft: "@0.25",
				paddingRight: "@0.25",
				borderRadius: "@border-radius.md",
			},
			lg: {
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.375",
				paddingRight: "@0.375",
				borderRadius: "@border-radius.lg",
			},
		},
	},
	compoundVariants: [
		// Light color (neutral light-mode values, fixed across themes)
		{
			match: { color: "light" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				borderColor: "@color.gray-200",
				"&:dark": {
					background: "@color.white",
					color: "@color.text-inverted",
					borderColor: "@color.gray-200",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "soft" as const },
			css: {
				background: "@color.gray-100",
				color: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-100",
					color: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "subtle" as const },
			css: {
				background: "@color.gray-100",
				color: "@color.gray-700",
				borderColor: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-100",
					color: "@color.gray-700",
					borderColor: "@color.gray-200",
				},
			},
		},

		// Dark color (neutral dark-mode values, fixed across themes)
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				background: "@color.gray-900",
				color: "@color.text-inverted",
				borderColor: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.text",
					borderColor: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "soft" as const },
			css: {
				background: "@color.gray-800",
				color: "@color.gray-300",
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-300",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "subtle" as const },
			css: {
				background: "@color.gray-800",
				color: "@color.gray-300",
				borderColor: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-300",
					borderColor: "@color.gray-700",
				},
			},
		},

		// Neutral color (adaptive: light in light mode, dark in dark mode)
		{
			match: { color: "neutral" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				borderColor: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.white",
					borderColor: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "soft" as const },
			css: {
				background: "@color.gray-100",
				color: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-300",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "subtle" as const },
			css: {
				background: "@color.gray-100",
				color: "@color.gray-700",
				borderColor: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-300",
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
