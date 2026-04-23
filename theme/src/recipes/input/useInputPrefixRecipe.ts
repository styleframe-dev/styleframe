import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Input prefix recipe — leading inline addon rendered INSIDE the input
 * wrapper, sharing the same visual field as the typed text. Use for icons,
 * currency symbols, units, or small affordances that sit to the left of the
 * caret. Distinct from `input-prepend`, which renders an OUTSIDE joined block
 * alongside the input.
 */
export const useInputPrefixRecipe = createUseRecipe("input-prefix", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		flexShrink: "0",
		color: "@color.text-weak",
		whiteSpace: "nowrap",
		userSelect: "none",
		"&:dark": {
			color: "@color.gray-400",
		},
	},
	variants: {
		size: {
			sm: {
				fontSize: "@font-size.xs",
				paddingRight: "@0.375",
				gap: "@0.25",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingRight: "@0.5",
				gap: "@0.375",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingRight: "@0.625",
				gap: "@0.5",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});
