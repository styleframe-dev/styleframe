<script setup lang="ts">
import "./BorderSwatch.styleframe?css";
import SwatchCard from "./primitives/SwatchCard.vue";

defineProps<{
	name: string;
	previewClass: string;
}>();
</script>

<template>
	<SwatchCard :name="name">
		<div :class="['border-swatch__preview', previewClass]" />
	</SwatchCard>
</template>
