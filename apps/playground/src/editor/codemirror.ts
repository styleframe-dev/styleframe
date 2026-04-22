import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { vue } from "@codemirror/lang-vue";
import { Compartment, EditorState, type Extension } from "@codemirror/state";
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
import { type PlaygroundEditorTheme, playgroundTheme } from "./theme";

export type EditorLanguage = "typescript" | "vue" | "css";

export interface EditorSelectionState {
	line: number;
	column: number;
}

export interface CreateEditorOptions {
	parent: HTMLElement;
	doc: string;
	language: EditorLanguage;
	theme?: PlaygroundEditorTheme;
	readOnly?: boolean;
	onChange?: (value: string) => void;
	onSelectionChange?: (state: EditorSelectionState) => void;
}

export function getEditorSelection(view: EditorView): EditorSelectionState {
	const pos = view.state.selection.main.head;
	const line = view.state.doc.lineAt(pos);
	return {
		line: line.number,
		column: pos - line.from + 1,
	};
}

function languageExtension(language: EditorLanguage): Extension {
	if (language === "vue") {
		return vue();
	}
	if (language === "css") {
		return css();
	}
	return javascript({ typescript: true, jsx: false });
}

const themeCompartment = new Compartment();

export function createEditor(options: CreateEditorOptions): EditorView {
	const {
		parent,
		doc,
		language,
		theme = "light",
		readOnly = false,
		onChange,
		onSelectionChange,
	} = options;

	const updateListener = EditorView.updateListener.of((update) => {
		if (update.docChanged && onChange) {
			onChange(update.state.doc.toString());
		}
		if (
			onSelectionChange &&
			(update.selectionSet || update.docChanged || update.focusChanged)
		) {
			onSelectionChange(getEditorSelection(update.view));
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
		themeCompartment.of(playgroundTheme(theme)),
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

export function setEditorTheme(
	view: EditorView,
	resolved: PlaygroundEditorTheme,
): void {
	view.dispatch({
		effects: themeCompartment.reconfigure(playgroundTheme(resolved)),
	});
}
