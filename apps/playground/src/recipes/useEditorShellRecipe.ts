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
		flex: "1 1 auto",
		minHeight: "0",
		overflow: "auto",
		fontFamily:
			'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
		fontSize: "@font-size.sm",
		lineHeight: "@line-height.normal",
	},
});
