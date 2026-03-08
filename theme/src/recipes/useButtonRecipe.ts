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
		fontSize: "@font-size.sm",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		borderRadius: "@border-radius.md",
		paddingTop: "@0.5",
		paddingBottom: "@0.5",
		paddingLeft: "@0.75",
		paddingRight: "@0.75",
		cursor: "pointer",
		transitionProperty: "color, background-color, border-color",
		transitionTimingFunction: "@easing.ease-in-out",
		transitionDuration: "150ms",
		textDecoration: "none",
		whiteSpace: "nowrap",
		userSelect: "none",
		outline: "none",
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
				paddingTop: "@0.25",
				paddingBottom: "@0.25",
				paddingLeft: "@0.5",
				paddingRight: "@0.5",
				gap: "@0.25",
				borderRadius: "@border-radius.md",
			},
			sm: {
				fontSize: "@font-size.sm",
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
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
			lg: {
				fontSize: "@font-size.md",
				lineHeight: "@line-height.normal",
				paddingTop: "@0.625",
				paddingBottom: "@0.625",
				paddingLeft: "@0.875",
				paddingRight: "@0.875",
				gap: "@0.5",
				borderRadius: "@border-radius.md",
			},
			xl: {
				fontSize: "@font-size.lg",
				lineHeight: "@line-height.normal",
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.5",
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
				color: "@color.white",
				"&:hover": {
					background: `@color.${color}-400`,
				},
				"&:active": {
					background: `@color.${color}-300`,
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
				background: `@color.${color}-900`,
				color: `@color.${color}`,
				"&:hover": {
					background: `@color.${color}-800`,
				},
				"&:active": {
					background: `@color.${color}-700`,
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
