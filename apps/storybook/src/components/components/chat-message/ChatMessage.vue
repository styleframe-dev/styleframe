<script setup lang="ts">
import { computed } from "vue";
import { chatMessage } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "outline" | "soft" | "subtle" | "ghost";
		size?: "sm" | "md" | "lg";
		side?: "start" | "end";
	}>(),
	{},
);

const classes = computed(() =>
	chatMessage({
		color: props.color,
		variant: props.variant,
		size: props.size,
		side: props.side,
	}),
);
</script>

<template>
	<article :class="classes">
		<slot />
	</article>
</template>
