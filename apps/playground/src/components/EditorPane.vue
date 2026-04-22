<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { pgEditorShell, pgEditorSurface } from "virtual:styleframe";
import {
	createEditor,
	type EditorLanguage,
	type EditorSelectionState,
	getEditorSelection,
	setEditorTheme,
	setEditorValue,
} from "@/editor/codemirror";
import { useTheme } from "@/state/theme";
import type { EditorView } from "@codemirror/view";
import FileTabList, { type FileTabEntry } from "./FileTabList.vue";

type FileId = "config" | "app" | "component";

interface FileEntry extends FileTabEntry<FileId> {
	language: EditorLanguage;
}

const props = defineProps<{
	files: Record<FileId, string>;
	active: FileId;
	dirty?: Partial<Record<FileId, boolean>>;
}>();

const emit = defineEmits<{
	"update:active": [value: FileId];
	change: [payload: { id: FileId; value: string }];
	"selection-change": [state: EditorSelectionState];
}>();

const tabs: FileEntry[] = [
	{
		id: "config",
		label: "styleframe.config.ts",
		language: "typescript",
	},
	{ id: "app", label: "App.vue", language: "vue" },
	{
		id: "component",
		label: "Component.vue",
		language: "vue",
	},
];

const host = ref<HTMLDivElement | null>(null);
const views = new Map<FileId, EditorView>();
const { resolved } = useTheme();

function mountEditor(entry: FileEntry) {
	if (!host.value) return;
	const container = document.createElement("div");
	container.style.height = "100%";
	container.style.display = entry.id === props.active ? "block" : "none";
	container.dataset.editorFor = entry.id;
	host.value.appendChild(container);
	const view = createEditor({
		parent: container,
		doc: props.files[entry.id],
		language: entry.language,
		theme: resolved.value,
		onChange(value) {
			emit("change", { id: entry.id, value });
		},
		onSelectionChange(state) {
			if (props.active === entry.id) emit("selection-change", state);
		},
	});
	views.set(entry.id, view);
}

function setActive(id: FileId) {
	if (!host.value) return;
	for (const child of Array.from(host.value.children)) {
		const editorFor = (child as HTMLElement).dataset.editorFor as
			| FileId
			| undefined;
		if (!editorFor) continue;
		(child as HTMLElement).style.display = editorFor === id ? "block" : "none";
	}
	const view = views.get(id);
	view?.focus();
	if (view) emit("selection-change", getEditorSelection(view));
}

onMounted(() => {
	for (const entry of tabs) {
		mountEditor(entry);
	}
	const view = views.get(props.active);
	if (view) emit("selection-change", getEditorSelection(view));
});

onBeforeUnmount(() => {
	for (const view of views.values()) view.destroy();
	views.clear();
});

watch(
	() => props.active,
	(next) => setActive(next),
);

watch(
	() => props.files,
	(next) => {
		for (const entry of tabs) {
			const view = views.get(entry.id);
			if (view) setEditorValue(view, next[entry.id]);
		}
	},
	{ deep: true },
);

watch(resolved, (next) => {
	for (const view of views.values()) setEditorTheme(view, next);
});
</script>

<template>
	<div :class="pgEditorShell()">
		<FileTabList
			:tabs="tabs"
			:model-value="active"
			:dirty="dirty"
			@update:model-value="(value) => emit('update:active', value)"
		/>
		<div ref="host" :class="pgEditorSurface()" />
	</div>
</template>
