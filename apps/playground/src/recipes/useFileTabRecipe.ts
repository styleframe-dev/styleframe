import { createUseRecipe } from "@styleframe/theme";

export const useFileTabListRecipe = createUseRecipe("pg-file-tab-list", {
	base: {
		display: "flex",
		alignItems: "stretch",
		gap: "0",
		paddingLeft: "0",
		paddingRight: "0",
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

export const useFileTabRecipe = createUseRecipe("pg-file-tab", {
	base: {
		position: "relative",
		display: "inline-flex",
		alignItems: "center",
		gap: "@0.375",
		paddingTop: "@0.5",
		paddingBottom: "@0.5",
		paddingLeft: "@0.75",
		paddingRight: "@0.75",
		fontSize: "@font-size.sm",
		fontWeight: "@font-weight.medium",
		lineHeight: "@line-height.normal",
		color: "@color.gray-500",
		background: "transparent",
		borderWidth: "@border-width.none",
		borderRightWidth: "@border-width.thin",
		borderRightStyle: "@border-style.solid",
		borderRightColor: "@color.gray-200",
		cursor: "pointer",
		userSelect: "none",
		whiteSpace: "nowrap",
		transitionProperty: "color, background-color",
		transitionDuration: "@duration.fast",
		"&:hover": {
			color: "@color.gray-900",
		},
		"&:dark": {
			color: "@color.gray-400",
			borderRightColor: "@color.gray-800",
		},
		"&:dark:hover": {
			color: "@color.white",
		},
	},
	variants: {
		state: {
			inactive: {},
			active: {
				color: "@color.gray-900",
				background: "@color.white",
				boxShadow: "inset 0 2px 0 @color.primary",
				"&:hover": {
					color: "@color.gray-900",
				},
				"&:dark": {
					color: "@color.white",
					background: "@color.gray-950",
				},
				"&:dark:hover": {
					color: "@color.white",
				},
			},
		},
	},
	defaultVariants: {
		state: "inactive",
	},
});

export const useFileTabDotRecipe = createUseRecipe("pg-file-tab-dot", {
	base: {
		display: "inline-block",
		flex: "0 0 auto",
		width: "8px",
		height: "8px",
		borderRadius: "@border-radius.full",
		background: "@color.gray-400",
		"&:dark": {
			background: "@color.gray-500",
		},
	},
});
