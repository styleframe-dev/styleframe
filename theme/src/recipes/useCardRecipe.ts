import { createUseRecipe } from "../utils/createUseRecipe";

/**
 * Card container recipe.
 * Supports color (light, dark, neutral), variant, and size axes.
 */
export const useCardRecipe = createUseRecipe("card", {
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
			outline: {},
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
	},
	compoundVariants: [
		// Light color (neutral light-mode values, fixed across themes)
		{
			match: { color: "light" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				borderColor: "@color.gray-150",
				"&:dark": {
					background: "@color.white",
					color: "@color.text-inverted",
					borderColor: "@color.gray-150",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "outline" as const },
			css: {
				color: "@color.text-inverted",
				borderColor: "@color.gray-300",
				"&:dark": {
					color: "@color.text",
					borderColor: "@color.gray-300",
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
				borderColor: "@color.gray-300",
				"&:dark": {
					background: "@color.gray-100",
					color: "@color.gray-700",
					borderColor: "@color.gray-300",
				},
			},
		},

		// Dark color (neutral dark-mode values, fixed across themes)
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				background: "@color.gray-900",
				color: "@color.white",
				borderColor: "@color.gray-850",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.white",
					borderColor: "@color.gray-850",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "outline" as const },
			css: {
				color: "@color.text",
				borderColor: "@color.gray-600",
				"&:dark": {
					color: "@color.text-inverted",
					borderColor: "@color.gray-600",
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
				borderColor: "@color.gray-600",
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-300",
					borderColor: "@color.gray-600",
				},
			},
		},

		// Neutral color (adaptive: light in light mode, dark in dark mode)
		{
			match: { color: "neutral" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				borderColor: "@color.gray-150",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.white",
					borderColor: "@color.gray-850",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "outline" as const },
			css: {
				color: "@color.text",
				borderColor: "@color.gray-300",
				"&:dark": {
					color: "@color.gray-200",
					borderColor: "@color.gray-600",
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
				borderColor: "@color.gray-300",
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-300",
					borderColor: "@color.gray-600",
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

/**
 * Card header recipe with bottom separator.
 */
export const useCardHeaderRecipe = createUseRecipe("card-header", {
	base: {
		display: "flex",
		alignItems: "center",
		gap: "@0.75",
		paddingTop: "@0.75",
		paddingBottom: "@0.75",
		paddingLeft: "@1",
		paddingRight: "@1",
		borderBottomWidth: "@border-width.thin",
		borderBottomStyle: "@border-style.solid",
		borderBottomColor: "@color.gray-200",
		"&:dark": {
			borderBottomColor: "@color.gray-700",
		},
	},
	variants: {
		size: {
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.5",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.75",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
				gap: "@1",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});

/**
 * Card body recipe for main content area.
 */
export const useCardBodyRecipe = createUseRecipe("card-body", {
	base: {
		display: "flex",
		flexDirection: "column",
		gap: "@0.5",
		paddingTop: "@0.75",
		paddingBottom: "@0.75",
		paddingLeft: "@1",
		paddingRight: "@1",
	},
	variants: {
		size: {
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.375",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.5",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
				gap: "@0.75",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});

/**
 * Card footer recipe with top separator.
 */
export const useCardFooterRecipe = createUseRecipe("card-footer", {
	base: {
		display: "flex",
		alignItems: "center",
		gap: "@0.75",
		paddingTop: "@0.75",
		paddingBottom: "@0.75",
		paddingLeft: "@1",
		paddingRight: "@1",
		borderTopWidth: "@border-width.thin",
		borderTopStyle: "@border-style.solid",
		borderTopColor: "@color.gray-200",
		"&:dark": {
			borderTopColor: "@color.gray-700",
		},
	},
	variants: {
		size: {
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.5",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.75",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
				gap: "@1",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});
