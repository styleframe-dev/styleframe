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
		dismissible?: boolean;
		icon?: string;
	}>(),
	{
		color: "info",
		variant: "soft",
		size: "md",
		orientation: "horizontal",
		title: "Alert",
		description: "This is an alert description.",
		dismissible: false,
		icon: "✓",
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
		<slot v-if="icon" name="icon">
			{{ props.icon }}
		</slot>
		<div>
			<strong v-if="props.title">{{ props.title }}</strong>
			<div v-if="props.description">{{ props.description }}</div>
		</div>
		<slot v-if="dismissible" name="dismiss">
			✖
		</slot>
	</div>
</template>
