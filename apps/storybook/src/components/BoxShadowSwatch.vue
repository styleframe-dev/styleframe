<script setup lang="ts">
import "./BoxShadowSwatch.styleframe?css";
import SwatchCard from "./primitives/SwatchCard.vue";

defineProps<{
	name: string;
	previewClass: string;
}>();
</script>

<template>
	<SwatchCard :name="name">
		<div :class="['box-shadow-swatch__preview', previewClass]" />
	</SwatchCard>
</template>
