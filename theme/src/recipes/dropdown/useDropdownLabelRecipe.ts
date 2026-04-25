import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Dropdown label recipe for group headings inside a Dropdown panel.
 * Supports color (light, dark, neutral) and size axes — no variant axis.
 */
export const useDropdownLabelRecipe = createUseRecipe("dropdown-label", {
	base: {
		display: "block",
		fontSize: "@font-size.2xs",
		fontWeight: "@font-weight.semibold",
		lineHeight: "@line-height.tight",
		textTransform: "uppercase",
		letterSpacing: "0.05em",
		paddingTop: "@0.375",
		paddingBottom: "@0.25",
		paddingLeft: "@0.625",
		paddingRight: "@0.625",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		size: {
			sm: {
				fontSize: "@font-size.3xs",
				paddingTop: "@0.25",
				paddingBottom: "@0.125",
				paddingLeft: "@0.5",
				paddingRight: "@0.5",
			},
			md: {
				fontSize: "@font-size.2xs",
				paddingTop: "@0.375",
				paddingBottom: "@0.25",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
			},
			lg: {
				fontSize: "@font-size.xs",
				paddingTop: "@0.5",
				paddingBottom: "@0.375",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
			},
		},
	},
	compoundVariants: [
		{
			match: { color: "light" as const },
			css: {
				color: "@color.gray-600",
				"&:dark": {
					color: "@color.gray-600",
				},
			},
		},
		{
			match: { color: "dark" as const },
			css: {
				color: "@color.gray-400",
				"&:dark": {
					color: "@color.gray-400",
				},
			},
		},
		{
			match: { color: "neutral" as const },
			css: {
				color: "@color.gray-600",
				"&:dark": {
					color: "@color.gray-400",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		size: "md",
	},
});
