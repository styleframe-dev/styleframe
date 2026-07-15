<script setup lang="ts">
import { computed } from "vue";
import { toastTitle } from "virtual:styleframe";

const props = defineProps<{
	size?: "sm" | "md" | "lg";
}>();

const classes = computed(() => toastTitle({ size: props.size }));
</script>

<template>
	<strong :class="classes">
		<slot />
	</strong>
</template>
