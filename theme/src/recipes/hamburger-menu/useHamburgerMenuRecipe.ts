import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Hamburger menu container recipe.
 * Provides the interactive wrapper with color, size, and focus styles.
 * Color is applied via CSS `color` property and inherited by the bars via `currentColor`.
 */
export const useHamburgerMenuRecipe = createUseRecipe("hamburger-menu", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		userSelect: "none",
		background: "transparent",
		borderWidth: "0",
		padding: "@0.25",
		outline: "none",
		transitionProperty: "opacity",
		transitionTimingFunction: "@easing.ease-in-out",
		transitionDuration: "150ms",
		"&:hover": {
			opacity: "0.8",
		},
		"&:focus": {
			opacity: "0.8",
		},
		"&:focus-visible": {
			outlineWidth: "2px",
			outlineStyle: "solid",
			outlineColor: "@color.primary",
			outlineOffset: "2px",
		},
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		size: {
			sm: {
				width: "@2",
				height: "@2",
			},
			md: {
				width: "@2.5",
				height: "@2.5",
			},
			lg: {
				width: "@3",
				height: "@3",
			},
		},
		animation: {
			close: {},
			"arrow-left": {},
			"arrow-right": {},
			"arrow-up": {},
			"arrow-down": {},
			plus: {},
			minus: {},
		},
		active: {
			true: {},
			false: {},
		},
	},
	compoundVariants: [
		{
			match: { color: "light" as const },
			css: {
				color: "@color.gray-700",
				"&:dark": {
					color: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "dark" as const },
			css: {
				color: "@color.white",
				"&:dark": {
					color: "@color.white",
				},
			},
		},
		{
			match: { color: "neutral" as const },
			css: {
				color: "@color.gray-700",
				"&:dark": {
					color: "@color.white",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		size: "md",
		animation: "close",
		active: "false",
	},
});
