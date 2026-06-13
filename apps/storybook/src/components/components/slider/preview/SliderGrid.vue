<script setup lang="ts">
import Slider from "../Slider.vue";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"error",
	"light",
	"dark",
	"neutral",
] as const;
</script>

<template>
	<div class="slider-section">
		<div v-for="color in colors" :key="color">
			<div class="slider-label">{{ color }}</div>
			<div class="slider-row">
				<div class="_max-width:[320px]">
					<Slider :color="color" />
				</div>
			</div>
		</div>
	</div>
</template>
