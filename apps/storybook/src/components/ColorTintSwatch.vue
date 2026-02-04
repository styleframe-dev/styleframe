<script setup lang="ts">
import { colorTintSwatch } from "virtual:styleframe";
import SwatchCard from "./primitives/SwatchCard.vue";

const props = defineProps<{
	name: string;
	value: string;
	label?: string;
}>();
</script>

<template>
	<SwatchCard :name="name" :label="label">
		<div :class="['color-tint-swatch__preview', colorTintSwatch({ variant: value })]">
			{{ name }}
		</div>
	</SwatchCard>
</template>
