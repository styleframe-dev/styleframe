<script setup lang="ts">
import { computed } from "vue";
import { pageHero } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		size?: "sm" | "md" | "lg";
		orientation?: "vertical" | "horizontal";
		alignment?: "start" | "center" | "end";
		reverse?: boolean;
	}>(),
	{},
);

const classes = computed(() =>
	pageHero({
		color: props.color,
		size: props.size,
		orientation: props.orientation,
		alignment: props.alignment,
		reverse: props.reverse ? "true" : undefined,
	}),
);
</script>

<template>
	<section :class="classes">
		<slot />
	</section>
</template>
