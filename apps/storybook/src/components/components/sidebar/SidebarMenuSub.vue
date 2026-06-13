<script setup lang="ts">
import { computed } from "vue";
import { sidebarMenuSub } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() => sidebarMenuSub({ size: props.size }));
</script>

<template>
	<ul :class="classes">
		<slot />
	</ul>
</template>
