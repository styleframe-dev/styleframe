<script setup lang="ts">
import "./ColorLightnessSwatch.styleframe?css";
import { colorLightnessSwatch } from "./ColorLightnessSwatch.styleframe?ts";
import SwatchCard from "./primitives/SwatchCard.vue";

const props = defineProps<{
	name: string;
	value: string;
}>();
</script>

<template>
	<SwatchCard :name="name">
		<div :class="['color-lightness-swatch__preview', colorLightnessSwatch({ variant: value })]">
			{{ name }}
		</div>
	</SwatchCard>
</template>
