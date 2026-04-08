<script setup lang="ts">
import { computed } from "vue";
import { popoverArrow } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "soft" | "subtle";
	}>(),
	{},
);

const classes = computed(() =>
	popoverArrow({
		color: props.color,
		variant: props.variant,
	}),
);
</script>

<template>
	<div :class="classes" />
</template>
