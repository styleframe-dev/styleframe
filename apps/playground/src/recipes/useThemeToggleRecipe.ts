import { createUseRecipe } from "@styleframe/theme";

export const useThemeToggleRecipe = createUseRecipe("pg-theme-toggle", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		width: "@1.5",
		height: "@1.5",
		padding: "0",
		color: "@color.gray-500",
		background: "transparent",
		borderWidth: "@border-width.none",
		borderRadius: "@border-radius.sm",
		cursor: "pointer",
		userSelect: "none",
		transitionProperty: "color, background-color",
		transitionDuration: "@duration.fast",
		"&:hover": {
			color: "@color.gray-900",
			background: "@color.gray-100",
		},
		"&:focus-visible": {
			outline: "2px solid @color.primary",
			outlineOffset: "2px",
		},
		"&:dark": {
			color: "@color.gray-400",
		},
		"&:dark:hover": {
			color: "@color.white",
			background: "@color.gray-800",
		},
	},
});
