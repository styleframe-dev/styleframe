<script setup lang="ts">
import { computed } from "vue";
import { callout, calloutDismiss, calloutIcon } from "virtual:styleframe";
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
			| "error"
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

defineEmits<{
	dismiss: [];
}>();

const classes = computed(() =>
	callout({
		color: props.color,
		variant: props.variant,
		size: props.size,
		orientation: props.orientation,
	}),
);

const iconClasses = computed(() => calloutIcon());
const dismissClasses = computed(() => calloutDismiss());
</script>

<template>
	<div :class="classes">
		<span v-if="icon" :class="iconClasses" aria-hidden="true">
			<slot name="icon">{{ props.icon }}</slot>
		</span>
		<CalloutContent>
			<CalloutTitle v-if="props.title">{{ props.title }}</CalloutTitle>
			<CalloutDescription
				v-if="props.description"
				>{{ props.description }}</CalloutDescription
			>
			<slot />
		</CalloutContent>
		<button
			v-if="dismissible"
			type="button"
			:class="dismissClasses"
			aria-label="Dismiss"
			@click="$emit('dismiss')"
		>
			<slot name="dismiss">&times;</slot>
		</button>
	</div>
</template>
