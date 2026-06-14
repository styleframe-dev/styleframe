<script setup lang="ts">
import { computed } from "vue";
import { sidebarFooter } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() => sidebarFooter({ size: props.size }));
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
