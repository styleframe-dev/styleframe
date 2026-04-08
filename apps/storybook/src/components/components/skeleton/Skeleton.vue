<script setup lang="ts">
import { computed } from "vue";
import { skeleton } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "xs" | "sm" | "md" | "lg" | "xl";
		rounded?: boolean;
	}>(),
	{},
);

const classes = computed(() =>
	skeleton({
		size: props.size,
		rounded: props.rounded ? "true" : "false",
	}),
);
</script>

<template>
	<div :class="classes" aria-hidden="true" />
</template>
