import { createUseRecipe } from "@styleframe/theme";

export const useToolbarRecipe = createUseRecipe("pg-toolbar", {
	base: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexShrink: 0,
		gap: "@0.75",
		paddingTop: "@0.375",
		paddingBottom: "@0.375",
		paddingLeft: "@0.75",
		paddingRight: "@0.75",
		height: "@3",
		borderBottomWidth: "@border-width.thin",
		borderBottomStyle: "@border-style.solid",
		borderBottomColor: "@color.gray-200",
		background: "@color.white",
		"&:dark": {
			background: "@color.gray-950",
			borderBottomColor: "@color.gray-800",
		},
	},
});

export const useToolbarSectionRecipe = createUseRecipe("pg-toolbar-section", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		gap: "@0.5",
	},
});
