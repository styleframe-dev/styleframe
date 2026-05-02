<script setup lang="ts">
import { computed } from "vue";
import { media } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		orientation?: "horizontal" | "vertical";
		align?: "start" | "center" | "end";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	media({
		orientation: props.orientation,
		align: props.align,
		size: props.size,
	}),
);
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
