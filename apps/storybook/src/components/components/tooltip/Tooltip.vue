<script setup lang="ts">
import { computed } from "vue";
import { tooltip } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "soft" | "subtle";
		size?: "sm" | "md" | "lg";
		label?: string;
	}>(),
	{},
);

const classes = computed(() =>
	tooltip({
		color: props.color,
		variant: props.variant,
		size: props.size,
	}),
);
</script>

<template>
	<span :class="classes">
		<slot>{{ props.label }}</slot>
	</span>
</template>
