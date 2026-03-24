import { createUseRecipe } from "../utils/createUseRecipe";

export const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"danger",
] as const;

export const variants = ["solid", "outline", "soft", "subtle"] as const;

/**
 * Full badge recipe with color, variant, and size variants.
 * Includes all Nuxt UI-inspired styling options.
 */
export const useBadgeRecipe = createUseRecipe("badge", {
	base: {
		display: "inline-flex",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		alignItems: "center",
		fontWeight: "@font-weight.medium",
		fontSize: "@font-size.sm",
		lineHeight: "1",
		paddingTop: "@0.25",
		paddingBottom: "@0.25",
		paddingLeft: "@0.375",
		paddingRight: "@0.375",
		borderRadius: "@border-radius.md",
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
				fontSize: "@font-size.2xs",
				lineHeight: "@line-height.normal",
				paddingTop: "@0.125",
				paddingBottom: "@0.125",
				paddingLeft: "@0.25",
				paddingRight: "@0.25",
				gap: "@0.125",
				borderRadius: "@border-radius.sm",
			},
			sm: {
				fontSize: "@font-size.xs",
				lineHeight: "@line-height.tight",
				paddingTop: "@0.25",
				paddingBottom: "@0.25",
				paddingLeft: "@0.375",
				paddingRight: "@0.375",
				gap: "@0.25",
				borderRadius: "@border-radius.md",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.5",
				paddingRight: "@0.5",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				gap: "@0.5",
				borderRadius: "@border-radius.md",
			},
			xl: {
				fontSize: "@font-size.lg",
				paddingTop: "@0.625",
				paddingBottom: "@0.625",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.625",
				borderRadius: "@border-radius.lg",
			},
		},
	},
	compoundVariants: colors.flatMap((color) => [
		{
			match: { color, variant: "solid" as const },
			css: {
				background: `@color.${color}`,
				color: "@color.white",
				borderColor: `@color.${color}-shade-50`,
				"&:dark": {
					borderColor: `@color.${color}-tint-50`,
				},
			},
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
				background: `@color.${color}-100`,
				color: `@color.${color}-700`,
				"&:dark": {
					background: `@color.${color}-800`,
					color: `@color.${color}-400`,
				},
			},
		},
		{
			match: { color, variant: "subtle" as const },
			css: {
				background: `@color.${color}-100`,
				color: `@color.${color}-700`,
				borderColor: `@color.${color}-300`,
				"&:dark": {
					background: `@color.${color}-800`,
					color: `@color.${color}-400`,
					borderColor: `@color.${color}-600`,
				},
			},
		},
	]),
	defaultVariants: {
		color: "primary",
		variant: "solid",
		size: "sm",
	},
});
