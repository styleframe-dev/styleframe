import { javascript } from "@codemirror/lang-javascript";
import { vue } from "@codemirror/lang-vue";
import { EditorState, type Extension } from "@codemirror/state";
import {
	EditorView,
	highlightActiveLine,
	highlightActiveLineGutter,
	keymap,
	lineNumbers,
} from "@codemirror/view";
import {
	defaultKeymap,
	history,
	historyKeymap,
	indentWithTab,
} from "@codemirror/commands";
import { bracketMatching, indentOnInput } from "@codemirror/language";
import { playgroundEditorTheme } from "./theme";

export type EditorLanguage = "typescript" | "vue";

export interface CreateEditorOptions {
	parent: HTMLElement;
	doc: string;
	language: EditorLanguage;
	readOnly?: boolean;
	onChange?: (value: string) => void;
}

function languageExtension(language: EditorLanguage): Extension {
	if (language === "vue") {
		return vue();
	}
	return javascript({ typescript: true, jsx: false });
}

export function createEditor(options: CreateEditorOptions): EditorView {
	const { parent, doc, language, readOnly = false, onChange } = options;

	const updateListener = EditorView.updateListener.of((update) => {
		if (update.docChanged && onChange) {
			onChange(update.state.doc.toString());
		}
	});

	const extensions: Extension[] = [
		lineNumbers(),
		highlightActiveLineGutter(),
		highlightActiveLine(),
		history(),
		bracketMatching(),
		indentOnInput(),
		keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
		languageExtension(language),
		playgroundEditorTheme,
		updateListener,
	];

	if (readOnly) {
		extensions.push(EditorState.readOnly.of(true));
	}

	const state = EditorState.create({ doc, extensions });
	return new EditorView({ state, parent });
}

export function setEditorValue(view: EditorView, value: string): void {
	const current = view.state.doc.toString();
	if (current === value) return;
	view.dispatch({
		changes: { from: 0, to: current.length, insert: value },
	});
}
