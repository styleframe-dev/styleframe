<script setup lang="ts">
import { computed } from "vue";
import { checkboxGroup } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		orientation?: "vertical" | "horizontal";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	checkboxGroup({
		orientation: props.orientation,
		size: props.size,
	}),
);
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
