<script setup lang="ts">
import { computed } from "vue";
import { calloutTitle } from "virtual:styleframe";

const props = defineProps<{
	size?: "sm" | "md" | "lg";
}>();

const classes = computed(() => calloutTitle({ size: props.size }));
</script>

<template>
	<strong :class="classes">
		<slot />
	</strong>
</template>
