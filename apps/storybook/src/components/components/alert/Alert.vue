<script setup lang="ts">
import { computed } from "vue";
import { alert } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?:
			| "primary"
			| "secondary"
			| "success"
			| "info"
			| "warning"
			| "danger"
			| "light"
			| "dark"
			| "neutral";
		variant?: "solid" | "outline" | "soft" | "subtle";
		size?: "sm" | "md" | "lg";
		orientation?: "horizontal" | "vertical";
		title?: string;
		description?: string;
	}>(),
	{
		color: "info",
		variant: "soft",
		size: "md",
		orientation: "horizontal",
		title: "Alert",
		description: "This is an alert description.",
	},
);

const classes = computed(() =>
	alert({
		color: props.color,
		variant: props.variant,
		size: props.size,
		orientation: props.orientation,
	}),
);
</script>

<template>
	<div :class="classes">
		<strong v-if="props.title">{{ props.title }}</strong>
		<span v-if="props.description">{{ props.description }}</span>
	</div>
</template>
