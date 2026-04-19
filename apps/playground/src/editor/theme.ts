import { EditorView } from "@codemirror/view";

const monoStack =
	'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

export const playgroundEditorTheme = EditorView.theme(
	{
		"&": {
			height: "100%",
			backgroundColor: "transparent",
			color: "inherit",
			fontFamily: monoStack,
		},
		".cm-scroller": {
			fontFamily: monoStack,
			lineHeight: "1.5",
		},
		".cm-gutters": {
			backgroundColor: "transparent",
			color: "rgb(148, 163, 184)",
			border: "none",
		},
		".cm-activeLine": {
			backgroundColor: "rgba(148, 163, 184, 0.08)",
		},
		".cm-activeLineGutter": {
			backgroundColor: "transparent",
		},
		".cm-content": {
			padding: "12px 0",
			caretColor: "currentColor",
		},
		".cm-cursor": {
			borderLeftColor: "currentColor",
		},
		".cm-selectionBackground, ::selection": {
			backgroundColor: "rgba(0, 122, 153, 0.25)",
		},
		"&.cm-focused .cm-selectionBackground": {
			backgroundColor: "rgba(0, 122, 153, 0.25)",
		},
		".cm-line": {
			padding: "0 12px",
		},
	},
	{ dark: false },
);
