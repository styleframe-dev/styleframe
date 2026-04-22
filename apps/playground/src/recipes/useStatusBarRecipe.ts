import { createUseRecipe } from "@styleframe/theme";

export const useStatusBarRecipe = createUseRecipe("pg-status-bar", {
	base: {
		display: "flex",
		alignItems: "center",
		flex: "0 0 auto",
		gap: "@0.75",
		paddingTop: "@0.25",
		paddingBottom: "@0.25",
		paddingLeft: "@0.75",
		paddingRight: "@0.75",
		fontSize: "@font-size.xs",
		lineHeight: "@line-height.normal",
		color: "@color.gray-300",
		background: "@color.gray-900",
		borderTopWidth: "@border-width.thin",
		borderTopStyle: "@border-style.solid",
		borderTopColor: "@color.gray-800",
		"&:dark": {
			color: "@color.gray-400",
			background: "@color.gray-950",
			borderTopColor: "@color.gray-800",
		},
	},
});

export const useStatusBarGroupRecipe = createUseRecipe("pg-status-bar-group", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		gap: "@0.75",
	},
	variants: {
		align: {
			start: {
				marginRight: "auto",
			},
			end: {
				marginLeft: "auto",
			},
		},
	},
});

export const useStatusBarItemRecipe = createUseRecipe("pg-status-bar-item", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		gap: "@0.25",
		whiteSpace: "nowrap",
	},
});

export const useStatusBarDotRecipe = createUseRecipe("pg-status-bar-dot", {
	base: {
		width: "6px",
		height: "6px",
		borderRadius: "@border-radius.full",
		background: "@color.success",
	},
	variants: {
		tone: {
			success: {
				background: "@color.success",
			},
			error: {
				background: "@color.error",
			},
			warning: {
				background: "@color.warning",
			},
		},
	},
	defaultVariants: {
		tone: "success",
	},
});
