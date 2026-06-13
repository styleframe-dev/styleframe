<script setup lang="ts">
import { computed } from "vue";
import { contextMenuLabel } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		size?: "sm" | "md" | "lg";
		inset?: boolean;
	}>(),
	{
		inset: false,
	},
);

const classes = computed(() =>
	contextMenuLabel({
		color: props.color,
		size: props.size,
		inset: props.inset ? "true" : "false",
	}),
);
</script>

<template>
	<div role="presentation" :class="classes">
		<slot />
	</div>
</template>
