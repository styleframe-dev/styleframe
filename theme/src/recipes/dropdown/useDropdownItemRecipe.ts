import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Dropdown item recipe for clickable menu options inside a Dropdown panel.
 * Supports color (light, dark, neutral), variant (solid, soft, subtle), and size axes.
 * Color and variant should match the parent Dropdown so hover/focus states
 * render coherently against the panel's surface.
 */
export const useDropdownItemRecipe = createUseRecipe("dropdown-item", {
	base: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		background: "transparent",
		fontWeight: "@font-weight.normal",
		fontSize: "@font-size.sm",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		borderRadius: "@border-radius.sm",
		lineHeight: "@line-height.normal",
		paddingTop: "@0.375",
		paddingBottom: "@0.375",
		paddingLeft: "@0.625",
		paddingRight: "@0.625",
		gap: "@0.5",
		cursor: "pointer",
		transitionProperty: "color, background-color, border-color",
		transitionTimingFunction: "@easing.ease-in-out",
		transitionDuration: "150ms",
		textAlign: "left",
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
				gap: "@0.375",
				borderRadius: "@border-radius.sm",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				gap: "@0.5",
				borderRadius: "@border-radius.sm",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.625",
				borderRadius: "@border-radius.md",
			},
		},
	},
	compoundVariants: [
		// Light color (fixed across themes — dark text on light surface)
		{
			match: { color: "light" as const, variant: "solid" as const },
			css: {
				color: "@color.text",
				"&:hover": {
					background: "@color.gray-100",
				},
				"&:focus": {
					background: "@color.gray-100",
				},
				"&:active": {
					background: "@color.gray-150",
				},
				"&:dark": {
					color: "@color.text-inverted",
				},
				"&:dark:hover": {
					background: "@color.gray-100",
				},
				"&:dark:focus": {
					background: "@color.gray-100",
				},
				"&:dark:active": {
					background: "@color.gray-150",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "soft" as const },
			css: {
				color: "@color.gray-700",
				"&:hover": {
					background: "@color.gray-200",
				},
				"&:focus": {
					background: "@color.gray-200",
				},
				"&:active": {
					background: "@color.gray-250",
				},
				"&:dark": {
					color: "@color.gray-700",
				},
				"&:dark:hover": {
					background: "@color.gray-200",
				},
				"&:dark:focus": {
					background: "@color.gray-200",
				},
				"&:dark:active": {
					background: "@color.gray-250",
				},
			},
		},
		{
			match: { color: "light" as const, variant: "subtle" as const },
			css: {
				color: "@color.gray-700",
				"&:hover": {
					background: "@color.gray-200",
				},
				"&:focus": {
					background: "@color.gray-200",
				},
				"&:active": {
					background: "@color.gray-250",
				},
				"&:dark": {
					color: "@color.gray-700",
				},
				"&:dark:hover": {
					background: "@color.gray-200",
				},
				"&:dark:focus": {
					background: "@color.gray-200",
				},
				"&:dark:active": {
					background: "@color.gray-250",
				},
			},
		},

		// Dark color (fixed across themes — light text on dark surface)
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				color: "@color.white",
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
					color: "@color.white",
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
			match: { color: "dark" as const, variant: "soft" as const },
			css: {
				color: "@color.gray-300",
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
			match: { color: "dark" as const, variant: "subtle" as const },
			css: {
				color: "@color.gray-300",
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

		// Neutral color (adaptive: light in light mode, dark in dark mode)
		{
			match: { color: "neutral" as const, variant: "solid" as const },
			css: {
				color: "@color.text",
				"&:hover": {
					background: "@color.gray-100",
				},
				"&:focus": {
					background: "@color.gray-100",
				},
				"&:active": {
					background: "@color.gray-150",
				},
				"&:dark": {
					color: "@color.white",
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
				color: "@color.gray-700",
				"&:hover": {
					background: "@color.gray-200",
				},
				"&:focus": {
					background: "@color.gray-200",
				},
				"&:active": {
					background: "@color.gray-250",
				},
				"&:dark": {
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
				color: "@color.gray-700",
				"&:hover": {
					background: "@color.gray-200",
				},
				"&:focus": {
					background: "@color.gray-200",
				},
				"&:active": {
					background: "@color.gray-250",
				},
				"&:dark": {
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
	],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
});
