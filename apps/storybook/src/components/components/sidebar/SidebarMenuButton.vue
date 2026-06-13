<script setup lang="ts">
import { computed } from "vue";
import { sidebarMenuButton } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "ghost" | "subtle";
		size?: "sm" | "md" | "lg";
		active?: boolean;
		disabled?: boolean;
		icon?: string;
		label?: string;
	}>(),
	{},
);

const classes = computed(() =>
	sidebarMenuButton({
		color: props.color,
		variant: props.variant,
		size: props.size,
		active: props.active ? "true" : "false",
		disabled: props.disabled ? "true" : "false",
	}),
);
</script>

<template>
	<button
		:class="classes"
		type="button"
		:disabled="disabled"
		:aria-current="active ? 'page' : undefined"
	>
		<span v-if="icon" class="sidebar-menu-button-icon" aria-hidden="true">
			{{ icon }}
		</span>
		<span class="sidebar-menu-button-label">
			<slot>{{ label }}</slot>
		</span>
	</button>
</template>
