<script setup lang="ts">
import { computed } from "vue";
import {
	toast,
	toastDismiss,
	toastIcon,
	toastProgress,
} from "virtual:styleframe";
import ToastContent from "./ToastContent.vue";
import ToastTitle from "./ToastTitle.vue";
import ToastDescription from "./ToastDescription.vue";

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
		variant?: "solid" | "soft" | "subtle";
		size?: "sm" | "md" | "lg";
		orientation?: "horizontal" | "vertical";
		title?: string;
		description?: string;
		dismissible?: boolean;
		icon?: string;
		progress?: boolean;
	}>(),
	{},
);

defineEmits<{
	dismiss: [];
}>();

const classes = computed(() =>
	toast({
		color: props.color,
		variant: props.variant,
		size: props.size,
		orientation: props.orientation,
	}),
);

const iconClasses = computed(() => toastIcon());
const dismissClasses = computed(() => toastDismiss());
const progressClasses = computed(() => toastProgress());
</script>

<template>
	<div :class="classes" role="status">
		<span v-if="icon" :class="iconClasses" aria-hidden="true">
			<slot name="icon">{{ props.icon }}</slot>
		</span>
		<ToastContent>
			<ToastTitle v-if="props.title">{{ props.title }}</ToastTitle>
			<ToastDescription
				v-if="props.description"
				>{{ props.description }}</ToastDescription
			>
			<slot />
		</ToastContent>
		<button
			v-if="dismissible"
			type="button"
			:class="dismissClasses"
			aria-label="Dismiss"
			@click="$emit('dismiss')"
		>
			<slot name="dismiss">&times;</slot>
		</button>
		<div v-if="progress" :class="progressClasses" aria-hidden="true" />
	</div>
</template>
