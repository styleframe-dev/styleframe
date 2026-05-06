<script setup lang="ts">
import { computed } from "vue";
import { pageHeroTitle } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	pageHeroTitle({
		size: props.size,
	}),
);
</script>

<template>
	<h1 :class="classes">
		<slot />
	</h1>
</template>
