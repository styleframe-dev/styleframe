<script setup lang="ts">
import { computed } from "vue";

type IconName =
	| "sun"
	| "moon"
	| "monitor"
	| "close"
	| "reload"
	| "external"
	| "play"
	| "spinner"
	| "smartphone"
	| "tablet";

const props = withDefaults(
	defineProps<{
		name: IconName;
		size?: number | string;
	}>(),
	{
		size: 16,
	},
);

const sizeValue = computed(() =>
	typeof props.size === "number" ? `${props.size}px` : props.size,
);

const paths: Record<IconName, string> = {
	sun: '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>',
	moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>',
	monitor:
		'<rect x="3" y="4" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M8 20h8M12 16v4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>',
	close:
		'<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>',
	reload:
		'<path d="M21 12a9 9 0 1 1-3-6.7L21 8" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 3v5h-5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>',
	external:
		'<path d="M14 4h6v6M10 14L20 4M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>',
	play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
	spinner:
		'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.25" stroke-dasharray="14 42" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.9s" repeatCount="indefinite"/></circle>',
	smartphone:
		'<rect x="7" y="2" width="10" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M11 18h2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>',
	tablet:
		'<rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M11 18h2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>',
};

const svg = computed(() => paths[props.name]);
</script>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		:width="sizeValue"
		:height="sizeValue"
		aria-hidden="true"
		focusable="false"
		v-html="svg"
	/>
</template>
