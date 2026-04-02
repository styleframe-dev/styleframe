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
		"&:focus-visible": {
			outlineWidth: "2px",
			outlineStyle: "solid",
			outlineColor: "@color.primary",
			outlineOffset: "2px",
		},
		"&:disabled": {
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
			light: {},
			dark: {},
			neutral: {},
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
					background: `@color.${color}-800`,
				},
				"&:dark:focus": {
					color: `@color.${color}-300`,
					background: `@color.${color}-800`,
				},
				"&:dark:active": {
					color: `@color.${color}-300`,
					background: `@color.${color}-750`,
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
				"&:dark": {
					background: `@color.${color}-800`,
					color: `@color.${color}-400`,
				},
				"&:dark:hover": {
					background: `@color.${color}-750`,
				},
				"&:dark:focus": {
					background: `@color.${color}-750`,
				},
				"&:dark:active": {
					background: `@color.${color}-700`,
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
				"&:dark": {
					background: `@color.${color}-800`,
					color: `@color.${color}-400`,
					borderColor: `@color.${color}-600`,
				},
				"&:dark:hover": {
					background: `@color.${color}-750`,
				},
				"&:dark:focus": {
					background: `@color.${color}-750`,
				},
				"&:dark:active": {
					background: `@color.${color}-700`,
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
				"&:dark:hover": {
					color: `@color.${color}-400`,
					background: `@color.${color}-750`,
				},
				"&:dark:focus": {
					color: `@color.${color}-400`,
					background: `@color.${color}-750`,
				},
				"&:dark:active": {
					background: `@color.${color}-700`,
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

		// Light color
		{
			match: { color: "light" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				borderColor: "@color.gray-200",
				"&:hover": {
					background: "@color.gray-100",
				},
				"&:focus": {
					background: "@color.gray-100",
				},
				"&:active": {
					background: "@color.gray-200",
				},
				"&:dark": {
					color: "@color.text-inverted",
					borderColor: "@color.gray-300",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "outline" as const },
			css: {
				color: "@color.text",
				borderColor: "@color.gray-300",
				"&:hover": {
					background: "@color.gray-100",
				},
				"&:focus": {
					background: "@color.gray-100",
				},
				"&:active": {
					background: "@color.gray-200",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "soft" as const },
			css: {
				background: "@color.gray-100",
				color: "@color.gray-700",
				"&:hover": {
					background: "@color.gray-150",
				},
				"&:focus": {
					background: "@color.gray-150",
				},
				"&:active": {
					background: "@color.gray-200",
				},
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
				"&:hover": {
					background: "@color.gray-150",
				},
				"&:focus": {
					background: "@color.gray-150",
				},
				"&:active": {
					background: "@color.gray-200",
				},
				"&:dark": {
					background: "@color.gray-100",
					color: "@color.gray-700",
					borderColor: "@color.gray-300",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "ghost" as const },
			css: {
				color: "@color.gray-700",
				"&:hover": {
					background: "@color.gray-100",
				},
				"&:focus": {
					background: "@color.gray-100",
				},
				"&:active": {
					background: "@color.gray-200",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "link" as const },
			css: {
				color: "@color.gray-700",
				"&:hover": {
					color: "@color.gray-900",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:focus": {
					color: "@color.gray-900",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:active": {
					color: "@color.gray-900",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
			},
		},

		// Dark color
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				background: "@color.gray-900",
				color: "@color.white",
				borderColor: "@color.gray-800",
				"&:hover": {
					background: "@color.gray-800",
				},
				"&:focus": {
					background: "@color.gray-800",
				},
				"&:active": {
					background: "@color.gray-750",
				},
				"&:dark": {
					borderColor: "@color.gray-950",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "outline" as const },
			css: {
				color: "@color.gray-900",
				borderColor: "@color.gray-900",
				"&:hover": {
					background: "@color.gray-800",
					color: "@color.white",
				},
				"&:focus": {
					background: "@color.gray-800",
					color: "@color.white",
				},
				"&:active": {
					background: "@color.gray-750",
					color: "@color.white",
				},
				"&:dark": {
					color: "@color.gray-900",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "soft" as const },
			css: {
				background: "@color.gray-800",
				color: "@color.gray-200",
				"&:hover": {
					background: "@color.gray-750",
				},
				"&:focus": {
					background: "@color.gray-750",
				},
				"&:active": {
					background: "@color.gray-700",
				},
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-200",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "subtle" as const },
			css: {
				background: "@color.gray-800",
				color: "@color.gray-200",
				borderColor: "@color.gray-600",
				"&:hover": {
					background: "@color.gray-750",
				},
				"&:focus": {
					background: "@color.gray-750",
				},
				"&:active": {
					background: "@color.gray-700",
				},
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-200",
					borderColor: "@color.gray-600",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "ghost" as const },
			css: {
				color: "@color.gray-900",
				"&:hover": {
					background: "@color.gray-800",
					color: "@color.white",
				},
				"&:focus": {
					background: "@color.gray-800",
					color: "@color.white",
				},
				"&:active": {
					background: "@color.gray-750",
					color: "@color.white",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "link" as const },
			css: {
				color: "@color.gray-900",
				"&:hover": {
					color: "@color.black",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:focus": {
					color: "@color.black",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:active": {
					color: "@color.black",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
			},
		},

		// Neutral color (light in light mode, dark in dark mode)
		{
			match: { color: "neutral" as const, variant: "solid" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				borderColor: "@color.gray-200",
				"&:hover": {
					background: "@color.gray-100",
				},
				"&:focus": {
					background: "@color.gray-100",
				},
				"&:active": {
					background: "@color.gray-200",
				},
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.white",
					borderColor: "@color.gray-800",
				},
				"&:dark:hover": {
					background: "@color.gray-800",
				},
				"&:dark:focus": {
					background: "@color.gray-800",
				},
				"&:dark:active": {
					background: "@color.gray-750",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "outline" as const },
			css: {
				color: "@color.text",
				borderColor: "@color.gray-300",
				"&:hover": {
					background: "@color.gray-100",
				},
				"&:focus": {
					background: "@color.gray-100",
				},
				"&:active": {
					background: "@color.gray-200",
				},
				"&:dark": {
					color: "@color.gray-200",
					borderColor: "@color.gray-600",
				},
				"&:dark:hover": {
					background: "@color.gray-800",
				},
				"&:dark:focus": {
					background: "@color.gray-800",
				},
				"&:dark:active": {
					background: "@color.gray-750",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "soft" as const },
			css: {
				background: "@color.gray-100",
				color: "@color.gray-700",
				"&:hover": {
					background: "@color.gray-150",
				},
				"&:focus": {
					background: "@color.gray-150",
				},
				"&:active": {
					background: "@color.gray-200",
				},
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-300",
				},
				"&:dark:hover": {
					background: "@color.gray-750",
				},
				"&:dark:focus": {
					background: "@color.gray-750",
				},
				"&:dark:active": {
					background: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "subtle" as const },
			css: {
				background: "@color.gray-100",
				color: "@color.gray-700",
				borderColor: "@color.gray-300",
				"&:hover": {
					background: "@color.gray-150",
				},
				"&:focus": {
					background: "@color.gray-150",
				},
				"&:active": {
					background: "@color.gray-200",
				},
				"&:dark": {
					background: "@color.gray-800",
					color: "@color.gray-300",
					borderColor: "@color.gray-600",
				},
				"&:dark:hover": {
					background: "@color.gray-750",
				},
				"&:dark:focus": {
					background: "@color.gray-750",
				},
				"&:dark:active": {
					background: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "ghost" as const },
			css: {
				color: "@color.text",
				"&:hover": {
					background: "@color.gray-100",
				},
				"&:focus": {
					background: "@color.gray-100",
				},
				"&:active": {
					background: "@color.gray-200",
				},
				"&:dark": {
					color: "@color.gray-200",
				},
				"&:dark:hover": {
					background: "@color.gray-800",
				},
				"&:dark:focus": {
					background: "@color.gray-800",
				},
				"&:dark:active": {
					background: "@color.gray-750",
				},
			},
		},
		{
			match: { color: "neutral" as const, variant: "link" as const },
			css: {
				color: "@color.text",
				"&:hover": {
					color: "@color.gray-900",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:focus": {
					color: "@color.gray-900",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:active": {
					color: "@color.gray-900",
					textDecoration: "underline",
					textUnderlineOffset: "4px",
				},
				"&:dark": {
					color: "@color.gray-200",
				},
				"&:dark:hover": {
					color: "@color.white",
				},
				"&:dark:focus": {
					color: "@color.white",
				},
				"&:dark:active": {
					color: "@color.white",
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
