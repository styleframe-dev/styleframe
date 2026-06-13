<script setup lang="ts">
import { computed } from "vue";
import { drawer } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "soft" | "subtle";
		size?: "sm" | "md" | "lg";
		side?: "top" | "right" | "bottom" | "left";
	}>(),
	{},
);

const classes = computed(() =>
	drawer({
		color: props.color,
		variant: props.variant,
		size: props.size,
		side: props.side,
	}),
);
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
