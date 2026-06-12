import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Select separator recipe for visual dividers between option groups inside a
 * `.select-panel`. Mirrors the Dropdown separator — a 1px rule — and supports
 * color (light, dark, neutral) only, with no variant or size axis.
 */
export const useSelectSeparatorRecipe = createUseRecipe("select-separator", {
	base: {
		display: "block",
		width: "100%",
		height: "1px",
		borderWidth: "0",
		marginTop: "@0.25",
		marginBottom: "@0.25",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
	},
	compoundVariants: [
		{
			match: { color: "light" as const },
			css: {
				background: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-200",
				},
			},
		},
		{
			match: { color: "dark" as const },
			css: {
				background: "@color.gray-700",
				"&:dark": {
					background: "@color.gray-700",
				},
			},
		},
		{
			match: { color: "neutral" as const },
			css: {
				background: "@color.gray-200",
				"&:dark": {
					background: "@color.gray-700",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
	},
});
