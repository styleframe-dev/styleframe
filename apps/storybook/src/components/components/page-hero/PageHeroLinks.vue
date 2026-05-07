<script setup lang="ts">
import { computed } from "vue";
import { pageHeroLinks } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
		alignment?: "start" | "center" | "end";
		orientation?: "vertical" | "horizontal";
	}>(),
	{},
);

const classes = computed(() =>
	pageHeroLinks({
		size: props.size,
		alignment: props.alignment,
		orientation: props.orientation,
	}),
);
</script>

<template>
	<nav :class="classes">
		<slot />
	</nav>
</template>
