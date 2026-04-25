import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Input suffix recipe — trailing inline addon rendered INSIDE the input
 * wrapper, sharing the same visual field as the typed text. Use for icons,
 * unit labels, clear/reveal buttons, or small affordances that sit to the
 * right of the caret. Distinct from `input-append`, which renders an OUTSIDE
 * joined block alongside the input.
 */
export const useInputSuffixRecipe = createUseRecipe("input-suffix", {
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
				paddingLeft: "@0.375",
				gap: "@0.25",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingLeft: "@0.5",
				gap: "@0.375",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingLeft: "@0.625",
				gap: "@0.5",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});
