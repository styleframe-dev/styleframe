import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Card body recipe for main content area.
 */
export const useCardBodyRecipe = createUseRecipe(
	"card-body",
	{
		base: {
			display: "flex",
			flexDirection: "column",
			gap: "@0.5",
			paddingTop: "@0.75",
			paddingBottom: "@0.75",
			paddingLeft: "@1",
			paddingRight: "@1",
			borderTopWidth: "@border-width.thin",
			borderTopStyle: "@border-style.solid",
			borderTopColor: "transparent",
			borderBottomWidth: "@border-width.thin",
			borderBottomStyle: "@border-style.solid",
			borderBottomColor: "transparent",
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
		compoundVariants: [
			// Light
			{
				match: { color: "light" as const, variant: "solid" as const },
				css: {
					borderTopColor: "@color.gray-200",
					borderBottomColor: "@color.gray-200",
					"&:dark": {
						borderTopColor: "@color.gray-200",
						borderBottomColor: "@color.gray-200",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "outline" as const },
				css: {
					borderTopColor: "@color.gray-200",
					borderBottomColor: "@color.gray-200",
					"&:dark": {
						borderTopColor: "@color.gray-200",
						borderBottomColor: "@color.gray-200",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "soft" as const },
				css: {
					borderTopColor: "transparent",
					borderBottomColor: "transparent",
					"&:dark": {
						borderTopColor: "transparent",
						borderBottomColor: "transparent",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "subtle" as const },
				css: {
					borderTopColor: "@color.gray-200",
					borderBottomColor: "@color.gray-300",
					"&:dark": {
						borderTopColor: "@color.gray-200",
						borderBottomColor: "@color.gray-300",
					},
				},
			},

			// Dark
			{
				match: { color: "dark" as const, variant: "solid" as const },
				css: {
					borderTopColor: "@color.gray-800",
					borderBottomColor: "@color.gray-800",
					"&:dark": {
						borderTopColor: "@color.gray-800",
						borderBottomColor: "@color.gray-800",
					},
				},
			},
			{
				match: { color: "dark" as const, variant: "outline" as const },
				css: {
					borderTopColor: "@color.gray-800",
					borderBottomColor: "@color.gray-600",
					"&:dark": {
						borderTopColor: "@color.gray-800",
						borderBottomColor: "@color.gray-600",
					},
				},
			},
			{
				match: { color: "dark" as const, variant: "soft" as const },
				css: {
					borderTopColor: "transparent",
					borderBottomColor: "transparent",
					"&:dark": {
						borderTopColor: "transparent",
						borderBottomColor: "transparent",
					},
				},
			},
			{
				match: { color: "dark" as const, variant: "subtle" as const },
				css: {
					borderTopColor: "@color.gray-600",
					borderBottomColor: "@color.gray-600",
					"&:dark": {
						borderTopColor: "@color.gray-600",
						borderBottomColor: "@color.gray-600",
					},
				},
			},

			// Neutral
			{
				match: { color: "neutral" as const, variant: "solid" as const },
				css: {
					borderTopColor: "@color.gray-200",
					borderBottomColor: "@color.gray-200",
					"&:dark": {
						borderTopColor: "@color.gray-800",
						borderBottomColor: "@color.gray-800",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "outline" as const },
				css: {
					borderTopColor: "@color.gray-200",
					borderBottomColor: "@color.gray-200",
					"&:dark": {
						borderTopColor: "@color.gray-800",
						borderBottomColor: "@color.gray-800",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "soft" as const },
				css: {
					borderTopColor: "transparent",
					borderBottomColor: "transparent",
					"&:dark": {
						borderTopColor: "transparent",
						borderBottomColor: "transparent",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "subtle" as const },
				css: {
					borderTopColor: "@color.gray-300",
					borderBottomColor: "@color.gray-300",
					"&:dark": {
						borderTopColor: "@color.gray-600",
						borderBottomColor: "@color.gray-600",
					},
				},
			},
		],
		defaultVariants: {
			color: "neutral",
			variant: "solid",
			size: "md",
		},
	},
	(s) => {
		// Collapse bottom border when followed by card footer
		s.selector(".card-body:has(+ .card-footer)", {
			borderBottomColor: "transparent",
		});
	},
);
