<script setup lang="ts">
import { computed } from "vue";
import { selectPanel } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "soft" | "subtle";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	selectPanel({
		color: props.color,
		variant: props.variant,
		size: props.size,
	}),
);
</script>

<template>
	<ul role="listbox" :class="classes">
		<slot />
	</ul>
</template>
