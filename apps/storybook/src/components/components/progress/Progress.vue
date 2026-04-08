<script setup lang="ts">
import { computed } from "vue";
import { progress } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		size?: "xs" | "sm" | "md" | "lg" | "xl";
		orientation?: "horizontal" | "vertical";
		value?: number;
	}>(),
	{},
);

const classes = computed(() =>
	progress({
		color: props.color,
		size: props.size,
		orientation: props.orientation,
	}),
);
</script>

<template>
	<div
		:class="classes"
		role="progressbar"
		:aria-valuenow="value"
		:aria-valuemin="0"
		:aria-valuemax="100"
		:aria-orientation="orientation"
	>
		<slot />
	</div>
</template>
