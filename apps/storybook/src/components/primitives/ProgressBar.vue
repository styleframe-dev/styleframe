<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	percentage: number;
}>();

const fillWidth = computed(
	() => `${Math.max(0, Math.min(100, props.percentage))}%`,
);
</script>

<template>
	<div class="progress-bar">
		<div class="progress-bar__fill" :style="{ width: fillWidth }" />
	</div>
</template>
