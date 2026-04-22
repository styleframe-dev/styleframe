// @vitest-environment jsdom
import type { EditorView } from "@codemirror/view";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createEditor, setEditorValue } from "@/editor/codemirror";

const openEditors: EditorView[] = [];

function mount(
	overrides: Partial<Parameters<typeof createEditor>[0]> = {},
): EditorView {
	const parent = document.createElement("div");
	document.body.appendChild(parent);
	const view = createEditor({
		parent,
		doc: "const x = 1;",
		language: "typescript",
		...overrides,
	});
	openEditors.push(view);
	return view;
}

afterEach(() => {
	while (openEditors.length > 0) {
		openEditors.pop()?.destroy();
	}
	document.body.replaceChildren();
});

describe("createEditor", () => {
	it("mounts a CodeMirror view into the provided parent", () => {
		const parent = document.createElement("div");
		document.body.appendChild(parent);
		const view = createEditor({
			parent,
			doc: "hello",
			language: "typescript",
		});
		openEditors.push(view);

		expect(parent.querySelector(".cm-content")).not.toBeNull();
	});

	it("initialises the document from the doc option", () => {
		const view = mount({ doc: "const answer = 42;" });
		expect(view.state.doc.toString()).toBe("const answer = 42;");
	});

	it("invokes onChange when the document changes", () => {
		const onChange = vi.fn();
		const view = mount({ doc: "", onChange });

		view.dispatch({ changes: { from: 0, insert: "hi" } });

		expect(onChange).toHaveBeenCalledWith("hi");
	});

	it("marks the editor state as read-only when readOnly is true", () => {
		const writable = mount({ readOnly: false });
		const locked = mount({ readOnly: true });

		expect(writable.state.readOnly).toBe(false);
		expect(locked.state.readOnly).toBe(true);
	});

	it("selects different language extensions for vue and typescript", () => {
		const ts = mount({ language: "typescript" });
		const vue = mount({ language: "vue" });

		expect(ts.state).not.toBe(vue.state);
		expect(ts.state.doc.toString()).toBe("const x = 1;");
		expect(vue.state.doc.toString()).toBe("const x = 1;");
	});
});

describe("setEditorValue", () => {
	it("dispatches a replacement when the value differs", () => {
		const view = mount({ doc: "old" });
		const spy = vi.spyOn(view, "dispatch");

		setEditorValue(view, "new");

		expect(spy).toHaveBeenCalledTimes(1);
		expect(view.state.doc.toString()).toBe("new");
	});

	it("does not dispatch when the value is unchanged", () => {
		const view = mount({ doc: "same" });
		const spy = vi.spyOn(view, "dispatch");

		setEditorValue(view, "same");

		expect(spy).not.toHaveBeenCalled();
	});
});
