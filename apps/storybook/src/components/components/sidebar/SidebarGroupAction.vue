<script setup lang="ts">
import { computed } from "vue";
import { sidebarGroupAction } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
		label?: string;
	}>(),
	{},
);

const classes = computed(() => sidebarGroupAction({ size: props.size }));
</script>

<template>
	<button :class="classes" type="button" :aria-label="label">
		<slot />
	</button>
</template>
