<script setup lang="ts">
import { ref } from "vue";
import {
	pgSplitPane,
	pgSplitPaneDivider,
	pgSplitPanePane,
} from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		initial?: number;
		min?: number;
		max?: number;
	}>(),
	{ initial: 50, min: 20, max: 80 },
);

const ratio = ref(props.initial);
const container = ref<HTMLElement | null>(null);

function onPointerDown(event: PointerEvent) {
	(event.target as HTMLElement).setPointerCapture(event.pointerId);
	event.preventDefault();
}

function onPointerMove(event: PointerEvent) {
	if (!(event.buttons & 1)) return;
	const el = container.value;
	if (!el) return;
	const rect = el.getBoundingClientRect();
	if (rect.width === 0) return;
	const next = ((event.clientX - rect.left) / rect.width) * 100;
	ratio.value = Math.min(props.max, Math.max(props.min, next));
}
</script>

<template>
	<div ref="container" :class="pgSplitPane()">
		<div
			:class="pgSplitPanePane()"
			:style="{ flexBasis: `${ratio}%` }"
		>
			<slot name="left" />
		</div>
		<div
			:class="pgSplitPaneDivider()"
			role="separator"
			aria-orientation="vertical"
			@pointerdown="onPointerDown"
			@pointermove="onPointerMove"
		/>
		<div
			:class="pgSplitPanePane()"
			:style="{ flexBasis: `${100 - ratio}%` }"
		>
			<slot name="right" />
		</div>
	</div>
</template>
