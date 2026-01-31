<script setup lang="ts">
import "./BoxShadowSwatch.styleframe?css";

defineProps<{
	name: string;
	previewClass: string;
}>();
</script>

<template>
	<div class="box-shadow-swatch">
		<div :class="['box-shadow-swatch__preview', previewClass]" />
		<span class="box-shadow-swatch__name">{{ name }}</span>
	</div>
</template>
