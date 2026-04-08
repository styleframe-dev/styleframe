<script setup lang="ts">
import { computed } from "vue";
import { progressBar } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?:
			| "primary"
			| "secondary"
			| "success"
			| "info"
			| "warning"
			| "error"
			| "light"
			| "dark"
			| "neutral";
		size?: "xs" | "sm" | "md" | "lg" | "xl";
		value?: number;
	}>(),
	{ value: 0 },
);

const classes = computed(() =>
	progressBar({
		color: props.color,
		size: props.size,
	}),
);

const widthStyle = computed(() => ({
	width: `${Math.min(100, Math.max(0, props.value))}%`,
}));
</script>

<template>
	<div :class="classes" :style="widthStyle" />
</template>
