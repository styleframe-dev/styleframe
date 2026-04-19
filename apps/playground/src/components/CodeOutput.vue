<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { pgEditorSurface } from "virtual:styleframe";
import type { EditorView } from "@codemirror/view";
import {
	createEditor,
	type EditorLanguage,
	setEditorValue,
} from "@/editor/codemirror";

const props = defineProps<{
	value: string;
	language: EditorLanguage;
}>();

const host = ref<HTMLDivElement | null>(null);
let view: EditorView | null = null;

onMounted(() => {
	if (!host.value) return;
	view = createEditor({
		parent: host.value,
		doc: props.value,
		language: props.language,
		readOnly: true,
	});
});

onBeforeUnmount(() => {
	view?.destroy();
	view = null;
});

watch(
	() => props.value,
	(next) => {
		if (view) setEditorValue(view, next);
	},
);
</script>

<template>
	<div ref="host" :class="pgEditorSurface()" />
</template>
