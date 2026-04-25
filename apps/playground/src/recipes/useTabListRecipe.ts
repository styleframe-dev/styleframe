import { createUseRecipe } from "@styleframe/theme";

export const useTabListRecipe = createUseRecipe("pg-tab-list", {
	base: {
		display: "flex",
		alignItems: "stretch",
		gap: "@0.25",
		paddingLeft: "@0.5",
		paddingRight: "@0.5",
		borderBottomWidth: "@border-width.thin",
		borderBottomStyle: "@border-style.solid",
		borderBottomColor: "@color.gray-200",
		background: "@color.gray-50",
		"&:dark": {
			background: "@color.gray-900",
			borderBottomColor: "@color.gray-800",
		},
	},
});
