<script setup lang="ts">
import { computed } from "vue";
import { sidebarGroupLabel } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	sidebarGroupLabel({ color: props.color, size: props.size }),
);
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
