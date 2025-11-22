<script setup lang="ts">
import { computed } from "vue";

const screenWidth = ref(992);

// Fluid viewport configuration
const minViewport = 320;
const maxViewport = 1440;

// Base font size range (min to max)
const baseFontSizeMin = 16;
const baseFontSizeMax = 18;

// Scale ratios for different viewport sizes
// Using Minor Third (1.2) for mobile and Major Third (1.25) for desktop
const scaleMin = 1.2;
const scaleMax = 1.25;

// Calculate fluid breakpoint variable based on current screen width
const fluidBreakpoint = computed(() => {
	const viewport = Math.max(
		minViewport,
		Math.min(maxViewport, screenWidth.value),
	);
	return (viewport - minViewport) / (maxViewport - minViewport);
});

// Calculate fluid font size using clamp-like logic
const calculateFluidSize = (min: number, max: number) => {
	const diff = max - min;
	return min + diff * fluidBreakpoint.value;
};

// Calculate scale powers
const getScalePower = (power: number, isMin: boolean) => {
	const scale = isMin ? scaleMin : scaleMax;
	return Math.pow(scale, power);
};

// Generate fluid font sizes for different text elements
const fluidFontSizes = computed(() => {
	// Calculate base font size
	const baseFontSize = calculateFluidSize(baseFontSizeMin, baseFontSizeMax);

	// Calculate each size using scale powers
	const h1Min = baseFontSizeMin * getScalePower(4, true);
	const h1Max = baseFontSizeMax * getScalePower(4, false);
	const h1Size = calculateFluidSize(h1Min, h1Max);

	const pMin = baseFontSizeMin * getScalePower(0, true);
	const pMax = baseFontSizeMax * getScalePower(0, false);
	const pSize = calculateFluidSize(pMin, pMax);

	const cardMin = baseFontSizeMin * getScalePower(-1, true);
	const cardMax = baseFontSizeMax * getScalePower(-1, false);
	const cardSize = calculateFluidSize(cardMin, cardMax);

	return {
		"--fluid-h1-size": `${h1Size}px`,
		"--fluid-p-size": `${pSize}px`,
		"--fluid-card-size": `${cardSize}px`,
		"--fluid-breakpoint": fluidBreakpoint.value,
	};
});

// Format viewport width display
const viewportLabel = computed(() => {
	if (screenWidth.value <= 576) return "Mobile";
	if (screenWidth.value <= 992) return "Tablet";
	if (screenWidth.value <= 1200) return "Laptop";
	return "Desktop";
});

// Calculate actual font sizes for display
</script>

<template>
	<div
		class="fluid-responsive-design-demo relative flex flex-col items-center mx-2"
	>
		<BrowserFrame
			title="Fluid Responsive Design"
			:style="{ width: `${screenWidth}px` }"
			class="mb-6 max-w-full bg-gradient-to-br from-slate-300/80 via-slate-300/50 to-slate-300/10 dark:from-slate-800/10 dark:via-slate-800/40 dark:to-slate-800/10"
		>
			<main
				class="h-[420px] pt-8 flex flex-col gap-8"
				:class="{
					'px-0': screenWidth < 640,
					'px-8': screenWidth >= 640,
				}"
				:style="fluidFontSizes"
			>
				<h1
					class="font-extrabold text-center mx-auto"
					style="font-size: var(--fluid-h1-size); line-height: 1.1"
				>
					Typography that flows naturally across every screen size
				</h1>
				<p
					class="font-medium text-center mx-auto"
					style="font-size: var(--fluid-p-size); line-height: 1.6"
				>
					Say goodbye to cluttered breakpoint logic. Styleframe's
					fluid responsive design automatically scales your typography
					and spacing using mathematical precision.
				</p>
				<div
					class="cards flex gap-4"
					:class="screenWidth < 768 ? 'flex-col' : 'flex-row'"
				>
					<div
						class="card bg-white/20 border border-white/60 p-5 rounded-lg flex-1 dark:bg-slate-700/15 dark:border-slate-500/20"
						style="
							font-size: var(--fluid-card-size);
							line-height: 1.5;
						"
					>
						<div class="font-bold mb-2">Step 1</div>
						<div>
							Define your minimum scale for mobile viewports
						</div>
					</div>
					<div
						class="card bg-white/20 border border-white/60 p-5 rounded-lg flex-1 dark:bg-slate-700/15 dark:border-slate-500/20"
						style="
							font-size: var(--fluid-card-size);
							line-height: 1.5;
						"
					>
						<div class="font-bold mb-2">Step 2</div>
						<div>Set your maximum scale for desktop displays</div>
					</div>
					<div
						class="card bg-white/20 border border-white/60 p-5 rounded-lg flex-1 dark:bg-slate-700/15 dark:border-slate-500/20"
						style="
							font-size: var(--fluid-card-size);
							line-height: 1.5;
						"
					>
						<div class="font-bold mb-2">Step 3</div>
						<div>Watch as everything scales fluidly in between</div>
					</div>
				</div>
			</main>
		</BrowserFrame>

		<UCard class="w-[560px] max-w-full mt-[-100px]">
			<template #header>
				<div class="flex justify-between items-center">
					<h3 class="u-h3">Fluid Responsive Design Demo</h3>
					<div class="flex gap-2">
						<UBadge color="primary" variant="subtle">
							{{ screenWidth }}px
						</UBadge>
						<UBadge color="primary" variant="subtle">
							{{ viewportLabel }}
						</UBadge>
					</div>
				</div>
			</template>

			<div>
				<div
					class="flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400"
				>
					<span>{{ minViewport }}px</span>
					<span>{{ maxViewport }}px</span>
				</div>
				<USlider
					:min="minViewport"
					:max="maxViewport"
					v-model="screenWidth"
				/>

				<div
					class="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-500"
				>
					<span>Mobile</span>
					<span>Tablet</span>
					<span>Laptop</span>
					<span>Desktop</span>
				</div>
			</div>
		</UCard>
	</div>
</template>

<style scoped>
.fluid-responsive-design-demo {
	--fluid-h1-size: 24px;
	--fluid-p-size: 16px;
	--fluid-card-size: 14px;
	--fluid-breakpoint: 0;
}
</style>
