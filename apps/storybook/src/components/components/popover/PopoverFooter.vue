<script setup lang="ts">
import { computed } from "vue";
import { popoverFooter } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "soft" | "subtle";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	popoverFooter({
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
