import { createUseRecipe } from "@styleframe/theme";

export const useTabRecipe = createUseRecipe("pg-tab", {
	base: {
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
		borderBottomWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		cursor: "pointer",
		userSelect: "none",
		whiteSpace: "nowrap",
		transitionProperty: "color, border-color, background-color",
		transitionDuration: "@duration.fast",
		"&:hover": {
			color: "@color.gray-900",
		},
		"&:dark": {
			color: "@color.gray-400",
		},
		"&:dark:hover": {
			color: "@color.white",
		},
	},
	variants: {
		state: {
			inactive: {},
			active: {
				color: "@color.primary",
				borderColor: "@color.primary",
				"&:hover": {
					color: "@color.primary",
				},
				"&:dark": {
					color: "@color.primary",
				},
				"&:dark:hover": {
					color: "@color.primary",
				},
			},
		},
	},
	defaultVariants: {
		state: "inactive",
	},
});
