<script setup lang="ts">
import { computed } from "vue";
import { calloutDescription } from "virtual:styleframe";

const props = defineProps<{
	size?: "sm" | "md" | "lg";
}>();

const classes = computed(() => calloutDescription({ size: props.size }));
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
