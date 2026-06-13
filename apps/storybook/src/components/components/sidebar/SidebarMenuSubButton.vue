<script setup lang="ts">
import { computed } from "vue";
import { sidebarMenuSubButton } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "ghost" | "subtle";
		size?: "sm" | "md" | "lg";
		active?: boolean;
		disabled?: boolean;
		label?: string;
	}>(),
	{},
);

const classes = computed(() =>
	sidebarMenuSubButton({
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
		<span class="sidebar-menu-button-label">
			<slot>{{ label }}</slot>
		</span>
	</button>
</template>
