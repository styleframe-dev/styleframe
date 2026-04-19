import { createUseRecipe } from "@styleframe/theme";

export const useToolbarRecipe = createUseRecipe("pg-toolbar", {
	base: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "@0.5",
		paddingTop: "@0.5",
		paddingBottom: "@0.5",
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

export const useToolbarTitleRecipe = createUseRecipe("pg-toolbar-title", {
	base: {
		fontSize: "@font-size.sm",
		fontWeight: "@font-weight.semibold",
		color: "@color.gray-900",
		"&:dark": {
			color: "@color.white",
		},
	},
});

export const useToolbarSubtitleRecipe = createUseRecipe("pg-toolbar-subtitle", {
	base: {
		fontSize: "@font-size.xs",
		color: "@color.gray-500",
	},
});
