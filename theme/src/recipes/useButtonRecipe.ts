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
		lineHeight: "@line-height.normal",
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
				paddingTop: "@0.25",
				paddingBottom: "@0.25",
				paddingLeft: "@0.5",
				paddingRight: "@0.5",
				gap: "@0.25",
				borderRadius: "@border-radius.md",
			},
			sm: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingTop: "@0.625",
				paddingBottom: "@0.625",
				paddingLeft: "@0.875",
				paddingRight: "@0.875",
				gap: "@0.5",
				borderRadius: "@border-radius.md",
			},
			xl: {
				fontSize: "@font-size.lg",
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
				borderColor: `@color.${color}-shade-50`,
				"&:hover": {
					background: `@color.${color}-tint-50`,
				},
				"&:focus": {
					background: `@color.${color}-tint-50`,
				},
				"&:active": {
					background: `@color.${color}-tint-100`,
				},
				"&:dark": {
					borderColor: `@color.${color}-tint-50`,
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
					color: `@color.${color}-700`,
					background: `@color.${color}-150`,
				},
				"&:focus": {
					color: `@color.${color}-700`,
					background: `@color.${color}-150`,
				},
				"&:active": {
					color: `@color.${color}-700`,
					background: `@color.${color}-200`,
				},
				"&:dark:hover": {
					color: `@color.${color}-300`,
					background: `@color.${color}-700`,
				},
			},
		})),
		// Soft variants
		...colors.map((color) => ({
			match: { color, variant: "soft" as const },
			css: {
				background: `@color.${color}-100`,
				color: `@color.${color}-700`,
				"&:hover": {
					background: `@color.${color}-150`,
				},
				"&:focus": {
					background: `@color.${color}-150`,
				},
				"&:active": {
					background: `@color.${color}-200`,
				},
			},
		})),
		// Subtle variants
		...colors.map((color) => ({
			match: { color, variant: "subtle" as const },
			css: {
				background: `@color.${color}-100`,
				color: `@color.${color}-700`,
				borderColor: `@color.${color}-300`,
				"&:hover": {
					background: `@color.${color}-150`,
				},
				"&:focus": {
					background: `@color.${color}-150`,
				},
				"&:active": {
					background: `@color.${color}-200`,
				},
			},
		})),
		// Ghost variants
		...colors.map((color) => ({
			match: { color, variant: "ghost" as const },
			css: {
				color: `@color.${color}`,
				"&:hover": {
					color: `@color.${color}-700`,
					background: `@color.${color}-100`,
				},
				"&:focus": {
					color: `@color.${color}-700`,
					background: `@color.${color}-100`,
				},
				"&:active": {
					background: `@color.${color}-200`,
				},
			},
		})),
		// Link variants
		...colors.map((color) => ({
			match: { color, variant: "link" as const },
			css: {
				color: `@color.${color}`,
				"&:hover": {
					color: `@color.${color}-shade-50`,
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:focus": {
					color: `@color.${color}-shade-50`,
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:active": {
					color: `@color.${color}-shade-50`,
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
