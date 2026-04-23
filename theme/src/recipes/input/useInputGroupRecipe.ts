import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Input group recipe — a pure layout coordinator for an `.input` flanked by
 * transparent `input-prepend` / `input-append` slots. The group paints no
 * border or background of its own; the nested `.input` wrapper keeps its
 * own visual field. The group's only job is to flatten the border-radius
 * at the seams where prepend/append meet the input.
 */
export const useInputGroupRecipe = createUseRecipe(
	"input-group",
	{
		base: {
			display: "inline-flex",
			alignItems: "stretch",
			width: "100%",
			position: "relative",
		},
		variants: {
			size: {
				sm: {},
				md: {},
				lg: {},
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
	(s) => {
		const { selector } = s;

		selector(".input-group", {
			".input-prepend + .input": {
				borderTopLeftRadius: "0",
				borderBottomLeftRadius: "0",
			},
			".input-prepend > *:first-child": {
				borderTopRightRadius: "0",
				borderBottomRightRadius: "0",
			},
			".input:has(+ .input-append)": {
				borderTopRightRadius: "0",
				borderBottomRightRadius: "0",
			},
			".input-append > *:last-child": {
				borderTopLeftRadius: "0",
				borderBottomLeftRadius: "0",
			},
		});
	},
);
