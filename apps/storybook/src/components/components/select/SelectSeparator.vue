<script setup lang="ts">
import { computed } from "vue";
import { selectSeparator } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
	}>(),
	{},
);

const classes = computed(() => selectSeparator({ color: props.color }));
</script>

<template>
	<li role="separator" :class="classes" />
</template>
