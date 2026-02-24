import { createUseRecipe } from "../utils/createUseRecipe";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"danger",
] as const;

/**
 * Full button recipe with color, variant, and size variants.
 * Inspired by Nuxt UI Button with solid, outline, soft, subtle, ghost, and link variants.
 */
export const useButtonRecipe = createUseRecipe("button", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: "@font-weight.medium",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		borderRadius: "@border-radius.md",
		cursor: "pointer",
		transitionProperty: "color, background-color, border-color",
		transitionTimingFunction: "@easing.ease-in-out",
		transitionDuration: "150ms",
		textDecoration: "none",
		whiteSpace: "nowrap",
		userSelect: "none",
		"focus-visible": {
			outlineWidth: "2px",
			outlineStyle: "solid",
			outlineColor: "@color.primary",
			outlineOffset: "2px",
		},
		disabled: {
			cursor: "not-allowed",
			opacity: "0.75",
			pointerEvents: "none",
		},
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
			ghost: {
				background: "transparent",
			},
			link: {
				background: "transparent",
				borderColor: "transparent",
				borderWidth: "0",
			},
		},
		size: {
			xs: {
				fontSize: "@font-size.xs",
				lineHeight: "@line-height.normal",
				paddingTop: "@spacing.2xs",
				paddingBottom: "@spacing.2xs",
				paddingLeft: "@spacing.xs",
				paddingRight: "@spacing.xs",
				gap: "@spacing.2xs",
				borderRadius: "@border-radius.md",
			},
			sm: {
				fontSize: "@font-size.xs",
				lineHeight: "@line-height.normal",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
			md: {
				fontSize: "@font-size.sm",
				lineHeight: "@line-height.normal",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
			lg: {
				fontSize: "@font-size.sm",
				lineHeight: "@line-height.normal",
				paddingTop: "@spacing.xs",
				paddingBottom: "@spacing.xs",
				paddingLeft: "@spacing.sm",
				paddingRight: "@spacing.sm",
				gap: "@spacing.xs",
				borderRadius: "@border-radius.md",
			},
			xl: {
				fontSize: "@font-size.md",
				lineHeight: "@line-height.normal",
				paddingTop: "@spacing.xs",
				paddingBottom: "@spacing.xs",
				paddingLeft: "@spacing.sm",
				paddingRight: "@spacing.sm",
				gap: "@spacing.xs",
				borderRadius: "@border-radius.lg",
			},
		},
	},
	compoundVariants: [
		// Solid variants
		...colors.map((color) => ({
			match: { color, variant: "solid" as const },
			css: {
				background: `@color.${color}`,
				color: "@color.light",
				"&:hover": {
					background: `@color.${color}-600`,
				},
				"&:active": {
					background: `@color.${color}-700`,
				},
			},
		})),
		// Outline variants
		...colors.map((color) => ({
			match: { color, variant: "outline" as const },
			css: {
				color: `@color.${color}`,
				borderColor: `@color.${color}`,
				"&:hover": {
					background: `@color.${color}-950`,
				},
				"&:active": {
					background: `@color.${color}-900`,
				},
			},
		})),
		// Soft variants
		...colors.map((color) => ({
			match: { color, variant: "soft" as const },
			css: {
				background: `@color.${color}-950`,
				color: `@color.${color}`,
				"&:hover": {
					background: `@color.${color}-900`,
				},
				"&:active": {
					background: `@color.${color}-800`,
				},
			},
		})),
		// Subtle variants
		...colors.map((color) => ({
			match: { color, variant: "subtle" as const },
			css: {
				background: `@color.${color}-950`,
				color: `@color.${color}`,
				borderColor: `@color.${color}-800`,
				"&:hover": {
					background: `@color.${color}-900`,
				},
				"&:active": {
					background: `@color.${color}-800`,
				},
			},
		})),
		// Ghost variants
		...colors.map((color) => ({
			match: { color, variant: "ghost" as const },
			css: {
				color: `@color.${color}`,
				"&:hover": {
					background: `@color.${color}-950`,
				},
				"&:active": {
					background: `@color.${color}-900`,
				},
			},
		})),
		// Link variants
		...colors.map((color) => ({
			match: { color, variant: "link" as const },
			css: {
				color: `@color.${color}`,
				"&:hover": {
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
			},
		})),
	],
	defaultVariants: {
		color: "primary",
		variant: "solid",
		size: "md",
	},
});
