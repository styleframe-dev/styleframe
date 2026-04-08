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
		orientation?: "horizontal" | "vertical";
		inverted?: boolean;
		animation?:
			| "none"
			| "carousel"
			| "carousel-inverse"
			| "swing"
			| "elastic";
		value?: number | null;
	}>(),
	{ value: 0, animation: "none" },
);

const isIndeterminate = computed(() => props.value == null);

const classes = computed(() =>
	progressBar({
		color: props.color,
		size: props.size,
		orientation: props.orientation,
		inverted: props.inverted ? "true" : "false",
		animation:
			isIndeterminate.value && props.animation !== "none"
				? props.animation
				: "none",
	}),
);

const fillStyle = computed(() => {
	if (isIndeterminate.value) {
		return props.orientation === "vertical"
			? { height: "50%" }
			: { width: "50%" };
	}
	const clamped = `${Math.min(100, Math.max(0, props.value!))}%`;
	return props.orientation === "vertical"
		? { height: clamped }
		: { width: clamped };
});
</script>

<template>
	<div :class="classes" :style="fillStyle" />
</template>
