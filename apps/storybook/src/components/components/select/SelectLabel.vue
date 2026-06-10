<script setup lang="ts">
import { computed } from "vue";
import { selectLabel } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	selectLabel({
		color: props.color,
		size: props.size,
	}),
);
</script>

<template>
	<li role="presentation" :class="classes">
		<slot />
	</li>
</template>
