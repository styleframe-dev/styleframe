<script setup lang="ts">
import { computed } from "vue";
import { pageHeroDescription } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	pageHeroDescription({
		size: props.size,
	}),
);
</script>

<template>
	<p :class="classes">
		<slot />
	</p>
</template>
