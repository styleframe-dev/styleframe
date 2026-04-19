import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Dropdown item recipe for interactive menu items.
 * Supports color (light, dark, neutral), variant, size, active, and disabled axes.
 */
export const useDropdownItemRecipe = createUseRecipe("dropdown-item", {
	base: {
		display: "flex",
		alignItems: "center",
		gap: "@0.5",
		cursor: "pointer",
		background: "transparent",
		fontWeight: "@font-weight.normal",
		lineHeight: "@line-height.normal",
		textDecoration: "none",
		transitionProperty: "color, background-color",
		transitionTimingFunction: "@easing.ease-in-out",
		transitionDuration: "150ms",
		outline: "none",
		"&:hover": {
			textDecoration: "none",
		},
		"&:focus": {
			textDecoration: "none",
		},
		"&:focus-visible": {
			outlineWidth: "2px",
			outlineStyle: "solid",
			outlineColor: "@color.primary",
			outlineOffset: "-2px",
		},
		"&:disabled": {
			cursor: "not-allowed",
			opacity: "0.5",
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
			},
			md: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.5",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.75",
			},
		},
		active: {
			true: {
				fontWeight: "@font-weight.semibold",
			},
			false: {},
		},
		disabled: {
			true: {
				cursor: "not-allowed",
				opacity: "0.5",
				pointerEvents: "none",
			},
			false: {},
		},
	},
	compoundVariants: [
		// Light color (fixed across themes)
		{
			match: { color: "light" as const, variant: "solid" as const },
			css: {
				color: "@color.text",
				"&:hover": {
					color: "@color.text",
					background: "@color.gray-100",
				},
				"&:focus": {
					color: "@color.text",
					background: "@color.gray-100",
				},
				"&:active": {
					background: "@color.gray-200",
				},
				"&:dark": {
					color: "@color.text-inverted",
				},
				"&:dark:hover": {
					color: "@color.text-inverted",
					background: "@color.gray-100",
				},
				"&:dark:focus": {
					color: "@color.text-inverted",
					background: "@color.gray-100",
				},
				"&:dark:active": {
					background: "@color.gray-200",
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
					background: "@color.gray-300",
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
					background: "@color.gray-300",
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
					background: "@color.gray-300",
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
					background: "@color.gray-300",
				},
			},
		},

		// Dark color (fixed across themes)
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				color: "@color.gray-200",
				"&:hover": {
					color: "@color.gray-200",
					background: "@color.gray-800",
				},
				"&:focus": {
					color: "@color.gray-200",
					background: "@color.gray-800",
				},
				"&:active": {
					background: "@color.gray-750",
				},
				"&:dark": {
					color: "@color.gray-200",
				},
				"&:dark:hover": {
					color: "@color.gray-200",
					background: "@color.gray-800",
				},
				"&:dark:focus": {
					color: "@color.gray-200",
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
					background: "@color.gray-700",
				},
				"&:focus": {
					background: "@color.gray-700",
				},
				"&:active": {
					background: "@color.gray-650",
				},
				"&:dark": {
					color: "@color.gray-300",
				},
				"&:dark:hover": {
					background: "@color.gray-700",
				},
				"&:dark:focus": {
					background: "@color.gray-700",
				},
				"&:dark:active": {
					background: "@color.gray-650",
				},
			},
		},
		{
			match: { color: "dark" as const, variant: "subtle" as const },
			css: {
				color: "@color.gray-300",
				"&:hover": {
					background: "@color.gray-700",
				},
				"&:focus": {
					background: "@color.gray-700",
				},
				"&:active": {
					background: "@color.gray-650",
				},
				"&:dark": {
					color: "@color.gray-300",
				},
				"&:dark:hover": {
					background: "@color.gray-700",
				},
				"&:dark:focus": {
					background: "@color.gray-700",
				},
				"&:dark:active": {
					background: "@color.gray-650",
				},
			},
		},

		// Neutral color (adaptive: light in light mode, dark in dark mode)
		{
			match: { color: "neutral" as const, variant: "solid" as const },
			css: {
				color: "@color.text",
				"&:hover": {
					color: "@color.text",
					background: "@color.gray-100",
				},
				"&:focus": {
					color: "@color.text",
					background: "@color.gray-100",
				},
				"&:active": {
					background: "@color.gray-200",
				},
				"&:dark": {
					color: "@color.gray-200",
				},
				"&:dark:hover": {
					color: "@color.gray-200",
					background: "@color.gray-800",
				},
				"&:dark:focus": {
					color: "@color.gray-200",
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
					background: "@color.gray-300",
				},
				"&:dark": {
					color: "@color.gray-300",
				},
				"&:dark:hover": {
					background: "@color.gray-700",
				},
				"&:dark:focus": {
					background: "@color.gray-700",
				},
				"&:dark:active": {
					background: "@color.gray-650",
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
					background: "@color.gray-300",
				},
				"&:dark": {
					color: "@color.gray-300",
				},
				"&:dark:hover": {
					background: "@color.gray-700",
				},
				"&:dark:focus": {
					background: "@color.gray-700",
				},
				"&:dark:active": {
					background: "@color.gray-650",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
		active: "false",
		disabled: "false",
	},
});
