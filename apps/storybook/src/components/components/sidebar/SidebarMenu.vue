<script setup lang="ts">
import { computed } from "vue";
import { sidebarMenu } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() => sidebarMenu({ size: props.size }));
</script>

<template>
	<ul :class="classes">
		<slot />
	</ul>
</template>
