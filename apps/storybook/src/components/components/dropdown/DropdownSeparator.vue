<script setup lang="ts">
import { computed } from "vue";
import { dropdownSeparator } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
	}>(),
	{},
);

const classes = computed(() =>
	dropdownSeparator({
		color: props.color,
	}),
);
</script>

<template>
	<hr role="separator" :class="classes" />
</template>
