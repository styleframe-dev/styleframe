<script setup lang="ts">
import { colorShadeSwatch } from "virtual:styleframe";
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
