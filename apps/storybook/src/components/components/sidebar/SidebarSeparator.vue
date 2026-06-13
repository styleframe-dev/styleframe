<script setup lang="ts">
import { computed } from "vue";
import { sidebarSeparator } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
	}>(),
	{},
);

const classes = computed(() => sidebarSeparator({ color: props.color }));
</script>

<template>
	<div :class="classes" role="separator" />
</template>
