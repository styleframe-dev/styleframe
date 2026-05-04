<script setup lang="ts">
import { computed } from "vue";
import { mediaTitle } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	mediaTitle({
		size: props.size,
	}),
);
</script>

<template>
	<h3 :class="classes">
		<slot />
	</h3>
</template>
