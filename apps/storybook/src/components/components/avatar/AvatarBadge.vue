<script setup lang="ts">
import { computed } from "vue";
import { avatarBadge } from "virtual:styleframe";

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
		position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	}>(),
	{},
);

const classes = computed(() =>
	avatarBadge({
		color: props.color,
		size: props.size,
		position: props.position,
	}),
);
</script>

<template>
	<span :class="classes" />
</template>
