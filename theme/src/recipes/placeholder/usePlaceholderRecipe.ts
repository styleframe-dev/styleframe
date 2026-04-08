import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Placeholder recipe for visual placeholder containers.
 * A simple utility/display component with dashed border and crosshatch pattern.
 */
export const usePlaceholderRecipe = createUseRecipe("placeholder", {
	base: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.dashed",
		borderColor: "@color.gray-300",
		borderRadius: "@border-radius.md",
		overflow: "hidden",
		position: "relative",
		opacity: "0.75",
		"&:dark": {
			borderColor: "@color.gray-600",
		},
	},
	variants: {
		size: {
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.5",
				paddingRight: "@0.5",
			},
			md: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1",
				paddingRight: "@1",
			},
			lg: {
				paddingTop: "@1.5",
				paddingBottom: "@1.5",
				paddingLeft: "@1.5",
				paddingRight: "@1.5",
			},
		},
	},
	compoundVariants: [],
	defaultVariants: {
		size: "md",
	},
});
