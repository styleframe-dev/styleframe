import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Popover arrow recipe using CSS border-triangle technique.
 * Arrow border and background match the popover container.
 */
export const usePopoverArrowRecipe = createUseRecipe(
	"popover-arrow",
	{
		base: {
			width: "0",
			height: "0",
			borderLeftWidth: "calc(@popover.arrow.size + 1px)",
			borderLeftStyle: "@border-style.solid",
			borderLeftColor: "transparent",
			borderRightWidth: "calc(@popover.arrow.size + 1px)",
			borderRightStyle: "@border-style.solid",
			borderRightColor: "transparent",
			borderTopWidth: "calc(@popover.arrow.size + 1px)",
			borderTopStyle: "@border-style.solid",
			borderTopColor: "transparent",
			position: "absolute",
			zIndex: "@z-index.popover",
			"&:after": {
				borderLeftWidth: "@popover.arrow.size",
				borderLeftStyle: "@border-style.solid",
				borderLeftColor: "transparent",
				borderRightWidth: "@popover.arrow.size",
				borderRightStyle: "@border-style.solid",
				borderRightColor: "transparent",
				borderTopWidth: "@popover.arrow.size",
				borderTopStyle: "@border-style.solid",
				borderTopColor: "transparent",
				position: "absolute",
				left: "calc(@popover.arrow.size * -1)",
				top: "calc(@popover.arrow.size * -1 - 1px)",
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
					borderTopColor: "@color.gray-200",
					"&:after": {
						borderTopColor: "@color.gray-100",
					},
					"&:dark": {
						borderTopColor: "@color.gray-200",
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
					borderTopColor: "@color.gray-700",
					"&:after": {
						borderTopColor: "@color.gray-900",
					},
					"&:dark": {
						borderTopColor: "@color.gray-700",
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
					borderTopColor: "@color.gray-700",
					"&:after": {
						borderTopColor: "@color.gray-800",
					},
					"&:dark": {
						borderTopColor: "@color.gray-700",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-800",
					},
				},
			},

			// Neutral color (adaptive: light in light mode, dark in dark mode)
			{
				match: { color: "neutral" as const, variant: "solid" as const },
				css: {
					borderTopColor: "@color.gray-200",
					"&:after": {
						borderTopColor: "@color.white",
					},
					"&:dark": {
						borderTopColor: "@color.gray-700",
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
					borderTopColor: "@color.gray-200",
					"&:after": {
						borderTopColor: "@color.gray-100",
					},
					"&:dark": {
						borderTopColor: "@color.gray-700",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-800",
					},
				},
			},
		],
		defaultVariants: {
			color: "neutral",
			variant: "solid",
		},
	},
	(s) => {
		s.variable("popover.arrow.size", "6px", { default: true });
	},
);
