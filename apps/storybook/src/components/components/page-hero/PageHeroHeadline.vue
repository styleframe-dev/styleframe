<script setup lang="ts">
import { computed } from "vue";
import { pageHeroHeadline } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
		alignment?: "start" | "center" | "end";
		orientation?: "vertical" | "horizontal";
	}>(),
	{},
);

const classes = computed(() =>
	pageHeroHeadline({
		size: props.size,
		alignment: props.alignment,
		orientation: props.orientation,
	}),
);
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
