import { createUseRecipe } from "@styleframe/theme";

export const useBrandMarkRecipe = createUseRecipe("pg-brand-mark", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		gap: "@0.5",
		color: "@color.text",
	},
});

export const useBrandLogotypeRecipe = createUseRecipe("pg-brand-logotype", {
	base: {
		display: "block",
		height: "@1.25",
		width: "auto",
	},
});

export const useBrandBadgeRecipe = createUseRecipe("pg-brand-badge", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		paddingTop: "@0.125",
		paddingBottom: "@0.125",
		paddingLeft: "@0.375",
		paddingRight: "@0.375",
		fontSize: "@font-size.2xs",
		fontWeight: "@font-weight.semibold",
		letterSpacing: "0.08em",
		textTransform: "uppercase",
		color: "@color.primary",
		background: "@color.gray-100",
		borderRadius: "@border-radius.sm",
		"&:dark": {
			background: "@color.gray-800",
		},
	},
});
