<script setup lang="ts">
import { computed } from "vue";
import { callout } from "virtual:styleframe";
import CalloutContent from "./CalloutContent.vue";
import CalloutTitle from "./CalloutTitle.vue";
import CalloutDescription from "./CalloutDescription.vue";

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
	{},
);

const classes = computed(() =>
	callout({
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
		<CalloutContent>
			<CalloutTitle v-if="props.title">{{ props.title }}</CalloutTitle>
			<CalloutDescription v-if="props.description">{{ props.description }}</CalloutDescription>
			<slot />
		</CalloutContent>
		<slot v-if="dismissible" name="dismiss">
			✖
		</slot>
	</div>
</template>
