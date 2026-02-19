import { createUseRecipe } from "../utils/createUseRecipe";

/**
 * Base badge styling - core appearance without variants.
 * Use this when you want to define your own custom variants.
 */
export const useBadgeRecipeBase = createUseRecipe("badge", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		fontWeight: "@font-weight.medium",
		fontSize: "@font-size.xs",
		lineHeight: "1",
		paddingTop: "@spacing.xs",
		paddingBottom: "@spacing.xs",
		paddingLeft: "@spacing.sm",
		paddingRight: "@spacing.sm",
		borderRadius: "@border-radius.md",
	},
});

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"danger",
] as const;

const variants = ["solid", "outline", "soft", "subtle"] as const;

/**
 * Full badge recipe with color, variant, and size variants.
 * Includes all Nuxt UI-inspired styling options.
 */
export const useBadgeRecipe = createUseRecipe("badge", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		fontWeight: "@font-weight.medium",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
	},
	variants: {
		color: {
			primary: {},
			secondary: {},
			success: {},
			info: {},
			warning: {},
			danger: {},
		},
		variant: {
			solid: {},
			outline: {},
			soft: {},
			subtle: {},
		},
		size: {
			xs: {
				fontSize: "8px",
				lineHeight: "12px",
				paddingTop: "@0.125",
				paddingBottom: "@0.125",
				paddingLeft: "@spacing.2xs",
				paddingRight: "@spacing.2xs",
				gap: "@spacing.2xs",
				borderRadius: "@border-radius.sm",
			},
			sm: {
				fontSize: "10px",
				lineHeight: "12px",
				paddingTop: "@spacing.2xs",
				paddingBottom: "@spacing.2xs",
				paddingLeft: "@0.375",
				paddingRight: "@0.375",
				gap: "@spacing.2xs",
				borderRadius: "@border-radius.sm",
			},
			md: {
				fontSize: "@font-size.xs",
				paddingTop: "@spacing.2xs",
				paddingBottom: "@spacing.2xs",
				paddingLeft: "@spacing.xs",
				paddingRight: "@spacing.xs",
				gap: "@spacing.2xs",
				borderRadius: "@border-radius.md",
			},
			lg: {
				fontSize: "@font-size.sm",
				paddingTop: "@spacing.2xs",
				paddingBottom: "@spacing.2xs",
				paddingLeft: "@spacing.xs",
				paddingRight: "@spacing.xs",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
			xl: {
				fontSize: "@font-size.md",
				paddingTop: "@spacing.2xs",
				paddingBottom: "@spacing.2xs",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
		},
	},
	compoundVariants: colors.flatMap((color) => [
		{
			match: { color, variant: "solid" as const },
			css: { background: `@color.${color}`, color: "@color.light" },
		},
		{
			match: { color, variant: "outline" as const },
			css: {
				color: `@color.${color}`,
				borderColor: `@color.${color}`,
			},
		},
		{
			match: { color, variant: "soft" as const },
			css: {
				background: `@color.${color}-950`,
				color: `@color.${color}`,
			},
		},
		{
			match: { color, variant: "subtle" as const },
			css: {
				background: `@color.${color}-950`,
				color: `@color.${color}`,
				borderColor: `@color.${color}-800`,
			},
		},
	]),
	defaultVariants: {
		color: "primary",
		variant: "solid",
		size: "sm",
	},
});
