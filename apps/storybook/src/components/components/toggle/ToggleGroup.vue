<script setup lang="ts">
import { computed } from "vue";
import { toggleGroup } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		orientation?: "vertical" | "horizontal";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	toggleGroup({
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
