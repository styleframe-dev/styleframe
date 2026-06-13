<script setup lang="ts">
import { computed } from "vue";
import { contextMenuSeparator } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
	}>(),
	{},
);

const classes = computed(() =>
	contextMenuSeparator({
		color: props.color,
	}),
);
</script>

<template>
	<hr role="separator" :class="classes" />
</template>
