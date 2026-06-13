<script setup lang="ts">
import { computed } from "vue";
import { sidebarMenuAction } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
		label?: string;
	}>(),
	{},
);

const classes = computed(() => sidebarMenuAction({ size: props.size }));
</script>

<template>
	<button :class="classes" type="button" :aria-label="label">
		<slot />
	</button>
</template>
