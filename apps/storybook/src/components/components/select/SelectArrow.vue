<script setup lang="ts">
import { computed } from "vue";
import { selectArrow } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() => selectArrow({ size: props.size }));
</script>

<template>
	<span :class="classes" aria-hidden="true">
		<svg
			viewBox="0 0 24 24"
			width="100%"
			height="100%"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	</span>
</template>
