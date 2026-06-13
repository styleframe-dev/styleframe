<script setup lang="ts">
import { computed } from "vue";
import { contextMenuShortcut } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	contextMenuShortcut({
		color: props.color,
		size: props.size,
	}),
);
</script>

<template>
	<span :class="classes">
		<slot />
	</span>
</template>
