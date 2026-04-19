<script setup lang="ts">
import { computed } from "vue";
import { dropdownDivider } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "soft" | "subtle";
	}>(),
	{},
);

const classes = computed(() =>
	dropdownDivider({
		color: props.color,
		variant: props.variant,
	}),
);
</script>

<template>
	<hr :class="classes" role="separator" />
</template>
