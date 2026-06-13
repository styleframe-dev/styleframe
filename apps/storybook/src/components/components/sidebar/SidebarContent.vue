<script setup lang="ts">
import { computed } from "vue";
import { sidebarContent } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() => sidebarContent({ size: props.size }));
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
