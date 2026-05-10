<script setup lang="ts">
import { computed } from "vue";
import { chatMessageActions } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "outline" | "soft" | "subtle" | "naked";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	chatMessageActions({
		color: props.color,
		variant: props.variant,
		size: props.size,
	}),
);
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
