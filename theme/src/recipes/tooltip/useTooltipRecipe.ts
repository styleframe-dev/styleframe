import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Tooltip content bubble recipe.
 * Supports color (light, dark, neutral), variant, and size axes.
 */
export const useTooltipRecipe = createUseRecipe("tooltip", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		fontWeight: "@font-weight.medium",
		fontSize: "@font-size.sm",
		lineHeight: "@line-height.normal",
		paddingTop: "@0.375",
		paddingBottom: "@0.375",
		paddingLeft: "@0.625",
		paddingRight: "@0.625",
		borderRadius: "@border-radius.md",
		boxShadow: "@box-shadow.sm",
		zIndex: "@z-index.tooltip",
		maxWidth: "240px",
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
				fontSize: "@font-size.xs",
				paddingTop: "@0.25",
				paddingBottom: "@0.25",
				paddingLeft: "@0.5",
				paddingRight: "@0.5",
				borderRadius: "@border-radius.sm",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				borderRadius: "@border-radius.md",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				borderRadius: "@border-radius.md",
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
				color: "@color.text-inverted",
				borderColor: "@color.gray-800",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.text",
					borderColor: "@color.gray-800",
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
				borderColor: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.white",
					borderColor: "@color.gray-800",
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
		color: "dark",
		variant: "solid",
		size: "md",
	},
});

/**
 * Tooltip arrow recipe.
 * Arrow background and border match the tooltip content.
 */
export const useTooltipArrowRecipe = createUseRecipe(
	"tooltip-arrow",
	{
		base: {
			width: "0",
			height: "0",
			borderLeftWidth: "calc(@tooltip.arrow.size + 1px)",
			borderLeftStyle: "@border-style.solid",
			borderLeftColor: "transparent",
			borderRightWidth: "calc(@tooltip.arrow.size + 1px)",
			borderRightStyle: "@border-style.solid",
			borderRightColor: "transparent",
			borderTopWidth: "calc(@tooltip.arrow.size + 1px)",
			borderTopStyle: "@border-style.solid",
			borderTopColor: "transparent",
			position: "absolute",
			zIndex: "@z-index.tooltip",
			"&:after": {
				borderLeftWidth: "@tooltip.arrow.size",
				borderLeftStyle: "@border-style.solid",
				borderLeftColor: "transparent",
				borderRightWidth: "@tooltip.arrow.size",
				borderRightStyle: "@border-style.solid",
				borderRightColor: "transparent",
				borderTopWidth: "@tooltip.arrow.size",
				borderTopStyle: "@border-style.solid",
				borderTopColor: "transparent",
				position: "absolute",
				left: "calc(@tooltip.arrow.size * -1)",
				top: "calc(@tooltip.arrow.size * -1 - 1px)",
				zIndex: "0",
			},
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
					"&:after": {
						borderTopColor: "@color.white",
					},
					"&:dark": {
						borderTopColor: "@color.gray-200",
					},
					"&:dark:after": {
						borderTopColor: "@color.white",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "soft" as const },
				css: {
					borderTopColor: "@color.gray-100",
					"&:after": {
						borderTopColor: "@color.gray-100",
					},
					"&:dark": {
						borderTopColor: "@color.gray-100",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-100",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "subtle" as const },
				css: {
					borderTopColor: "@color.gray-300",
					"&:after": {
						borderTopColor: "@color.gray-100",
					},
					"&:dark": {
						borderTopColor: "@color.gray-300",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-100",
					},
				},
			},

			// Dark color (fixed across themes)
			{
				match: { color: "dark" as const, variant: "solid" as const },
				css: {
					borderTopColor: "@color.gray-800",
					"&:after": {
						borderTopColor: "@color.gray-900",
					},
					"&:dark": {
						borderTopColor: "@color.gray-800",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-900",
					},
				},
			},
			{
				match: { color: "dark" as const, variant: "soft" as const },
				css: {
					borderTopColor: "@color.gray-800",
					"&:after": {
						borderTopColor: "@color.gray-800",
					},
					"&:dark": {
						borderTopColor: "@color.gray-800",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-800",
					},
				},
			},
			{
				match: { color: "dark" as const, variant: "subtle" as const },
				css: {
					borderTopColor: "@color.gray-600",
					"&:after": {
						borderTopColor: "@color.gray-800",
					},
					"&:dark": {
						borderTopColor: "@color.gray-600",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-800",
					},
				},
			},

			// Neutral color (adaptive)
			{
				match: { color: "neutral" as const, variant: "solid" as const },
				css: {
					borderTopColor: "@color.gray-200",
					"&:after": {
						borderTopColor: "@color.white",
					},
					"&:dark": {
						borderTopColor: "@color.gray-800",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-900",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "soft" as const },
				css: {
					borderTopColor: "@color.gray-100",
					"&:after": {
						borderTopColor: "@color.gray-100",
					},
					"&:dark": {
						borderTopColor: "@color.gray-800",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-800",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "subtle" as const },
				css: {
					borderTopColor: "@color.gray-300",
					"&:after": {
						borderTopColor: "@color.gray-100",
					},
					"&:dark": {
						borderTopColor: "@color.gray-600",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-800",
					},
				},
			},
		],
		defaultVariants: {
			color: "dark",
			variant: "solid",
		},
	},
	(s) => {
		s.variable("tooltip.arrow.size", "5px", { default: true });
	},
);
