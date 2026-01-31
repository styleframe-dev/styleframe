<script setup lang="ts">
import "./ColorSwatch.styleframe?css";
import { colorPreview } from "./ColorSwatch.styleframe?ts";
import type { Color } from "./ColorSwatch.styleframe";

defineProps<{
	color: Color;
}>();
</script>

<template>
	<div class="color-swatch">
		<div :class="['color-swatch__preview', colorPreview({ color })]" />
		<span class="color-swatch__name">{{ color }}</span>
	</div>
</template>
