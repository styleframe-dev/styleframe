<script setup lang="ts">
import { ref as vueRef, onMounted } from "vue";
import { colorSwatch } from "virtual:styleframe";
import SwatchCard from "./primitives/SwatchCard.vue";

const props = defineProps<{
	name: string;
	value: string;
}>();

const previewEl = vueRef<HTMLElement | null>(null);
const contrastRatio = vueRef<number | null>(null);
const passesAA = vueRef(false);
const passesAAA = vueRef(false);

function parseColor(color: string): [number, number, number] {
	const ctx = document.createElement("canvas").getContext("2d")!;
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, 1, 1);
	const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
	return [r, g, b];
}

function relativeLuminance(r: number, g: number, b: number): number {
	const [rs, gs, bs] = [r, g, b].map((c) => {
		const s = c / 255;
		return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(l1: number, l2: number): number {
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
}

onMounted(() => {
	if (!previewEl.value) return;

	const bg = getComputedStyle(previewEl.value).backgroundColor;
	const fg = getComputedStyle(previewEl.value).color;

	const [br, bg2, bb] = parseColor(bg);
	const [fr, fg2, fb] = parseColor(fg);

	const bgLum = relativeLuminance(br, bg2, bb);
	const fgLum = relativeLuminance(fr, fg2, fb);

	const ratio = getContrastRatio(bgLum, fgLum);
	contrastRatio.value = Math.round(ratio * 100) / 100;
	passesAA.value = ratio >= 4.5;
	passesAAA.value = ratio >= 7;
});
</script>

<template>
	<SwatchCard :name="name">
		<div
			ref="previewEl"
			:class="['color-swatch__preview', colorSwatch({ variant: value })]"
		>
			{{ name }}
		</div>
		<template #label>
			<div class="swatch-card__label">
				Contrast Ratio: {{ contrastRatio ?? '–' }}:1

				<div :class="[passesAAA ? '_color:success' : passesAA ? '_color:warning' : '_color:danger']">
					WCAG {{ passesAAA ? 'AAA ✓' : passesAA ? 'AA ✓' : 'AA ✗' }}
				</div>
			</div>
		</template>
	</SwatchCard>
</template>
