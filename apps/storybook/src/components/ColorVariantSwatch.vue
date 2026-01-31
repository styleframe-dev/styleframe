<script setup lang="ts">
import "./ColorVariantSwatch.styleframe?css";

defineProps<{
	name: string;
	previewClass: string;
	label?: string;
}>();
</script>

<template>
	<div class="color-variant-swatch">
		<div :class="['color-variant-swatch__preview', previewClass]">
			{{ name }}
		</div>
		<span v-if="label" class="color-variant-swatch__label">{{ label }}</span>
	</div>
</template>
