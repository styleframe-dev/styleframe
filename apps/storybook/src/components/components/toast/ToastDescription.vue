<script setup lang="ts">
import { computed } from "vue";
import { toastDescription } from "virtual:styleframe";

const props = defineProps<{
	size?: "sm" | "md" | "lg";
}>();

const classes = computed(() => toastDescription({ size: props.size }));
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
