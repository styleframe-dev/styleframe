<script setup lang="ts">
import "./TypographySwatch.styleframe?css";

defineProps<{
	name: string;
	value?: string;
	previewClass: string;
	sampleText?: string;
}>();
</script>

<template>
	<div class="typography-swatch">
		<div class="typography-swatch__name">{{ name }}</div>
		<div v-if="value" class="typography-swatch__value">{{ value }}</div>
		<span :class="['typography-swatch__preview', previewClass]">
			{{ sampleText || "The quick brown fox jumps over the lazy dog" }}
		</span>
	</div>
</template>
