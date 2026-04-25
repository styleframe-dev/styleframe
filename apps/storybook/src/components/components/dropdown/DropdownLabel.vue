<script setup lang="ts">
import { computed } from "vue";
import { dropdownLabel } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	dropdownLabel({
		color: props.color,
		size: props.size,
	}),
);
</script>

<template>
	<div role="presentation" :class="classes">
		<slot />
	</div>
</template>
