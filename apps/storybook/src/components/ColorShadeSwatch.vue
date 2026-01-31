<script setup lang="ts">
import "./ColorShadeSwatch.styleframe?css";
import { colorShadeSwatch } from "./ColorShadeSwatch.styleframe?ts";
import SwatchCard from "./primitives/SwatchCard.vue";

const props = defineProps<{
	name: string;
	value: string;
	label?: string;
}>();
</script>

<template>
	<SwatchCard :name="name" :label="label">
		<div :class="['color-shade-swatch__preview', colorShadeSwatch({ variant: value })]">
			{{ name }}
		</div>
	</SwatchCard>
</template>
