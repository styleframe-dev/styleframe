<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps<{ srcdoc: string }>();
const emit = defineEmits<{
	"runtime-error": [message: string];
}>();

const iframe = ref<HTMLIFrameElement | null>(null);

function onMessage(event: MessageEvent) {
	const data = event.data as
		| { type?: string; detail?: { message?: string; stack?: string } }
		| undefined;
	if (!data || data.type !== "pg:error") return;
	const detail = data.detail ?? {};
	const parts = [detail.message, detail.stack].filter(Boolean);
	emit("runtime-error", parts.join("\n") || "Unknown runtime error");
}

onMounted(() => {
	window.addEventListener("message", onMessage);
});

onBeforeUnmount(() => {
	window.removeEventListener("message", onMessage);
});

watch(
	() => props.srcdoc,
	(next) => {
		if (iframe.value) iframe.value.srcdoc = next;
	},
	{ immediate: false },
);
</script>

<template>
	<iframe
		ref="iframe"
		:srcdoc="srcdoc"
		sandbox="allow-scripts allow-same-origin"
		title="Styleframe preview"
		:style="{ width: '100%', height: '100%', border: 'none', background: 'transparent' }"
	/>
</template>
