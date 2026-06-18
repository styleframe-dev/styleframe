import { createUseRecipe } from "@styleframe/theme";

export const useEditorShellRecipe = createUseRecipe("pg-editor-shell", {
	base: {
		display: "flex",
		flexDirection: "column",
		flex: "1 1 auto",
		minHeight: "0",
		background: "@color.white",
		"&:dark": {
			background: "@color.gray-950",
		},
	},
});

export const useEditorSurfaceRecipe = createUseRecipe("pg-editor-surface", {
	base: {
		position: "relative",
		flex: "1 1 auto",
		minHeight: "0",
		overflow: "auto",
		fontFamily:
			'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
		fontSize: "@font-size.sm",
		lineHeight: "@line-height.normal",
	},
});

export const useEditorEmptyRecipe = createUseRecipe("pg-editor-empty", {
	base: {
		position: "absolute",
		top: "0",
		left: "0",
		right: "0",
		bottom: "0",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "@1",
		textAlign: "center",
		fontSize: "@font-size.sm",
		fontFamily: "@font-family.base",
		color: "@color.gray-500",
	},
});
