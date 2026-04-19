<script setup lang="ts">
import { computed } from "vue";
import { toast, toastBody } from "virtual:styleframe";

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
		title?: string;
		description?: string;
		dismissible?: boolean;
		icon?: string;
		action?: string;
	}>(),
	{},
);

const emit = defineEmits<{
	dismiss: [];
	action: [];
}>();

const classes = computed(() =>
	toast({
		color: props.color,
		variant: props.variant,
		size: props.size,
	}),
);

const bodyClasses = computed(() => toastBody());
</script>

<template>
	<div :class="classes">
		<slot v-if="icon" name="icon">
			{{ props.icon }}
		</slot>
		<div :class="bodyClasses">
			<strong v-if="props.title">{{ props.title }}</strong>
			<div v-if="props.description">{{ props.description }}</div>
			<slot />
			<slot v-if="action" name="action">
				<button @click="emit('action')">
					{{ props.action }}
				</button>
			</slot>
		</div>
		<slot v-if="dismissible" name="dismiss">
			<button aria-label="Dismiss" @click="emit('dismiss')">
				&#10005;
			</button>
		</slot>
	</div>
</template>
