<script setup lang="ts">
import { computed } from "vue";
import { popover } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "outline" | "soft" | "subtle";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	popover({
		color: props.color,
		variant: props.variant,
		size: props.size,
	}),
);
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
