<script setup lang="ts">
import "./BorderSwatch.styleframe?css";

defineProps<{
	name: string;
	previewClass: string;
}>();
</script>

<template>
	<div class="border-swatch">
		<div :class="['border-swatch__preview', previewClass]" />
		<span class="border-swatch__name">{{ name }}</span>
	</div>
</template>
