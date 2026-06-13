<script setup lang="ts">
import { computed } from "vue";
import { radioGroup } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		orientation?: "vertical" | "horizontal";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	radioGroup({
		orientation: props.orientation,
		size: props.size,
	}),
);
</script>

<template>
	<div :class="classes" role="radiogroup">
		<slot />
	</div>
</template>
