<script setup lang="ts">
import Slider from "../Slider.vue";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
	<div class="slider-section">
		<div v-for="size in sizes" :key="size">
			<div class="slider-label">{{ size }}</div>
			<div class="slider-row">
				<div class="_max-width:[320px]">
					<Slider :size="size" />
				</div>
			</div>
		</div>
	</div>
</template>
