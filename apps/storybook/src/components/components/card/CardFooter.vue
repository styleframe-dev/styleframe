<script setup lang="ts">
import { computed } from "vue";
import { cardFooter } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	cardFooter({
		size: props.size,
	}),
);
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
