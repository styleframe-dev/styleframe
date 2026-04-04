<script setup lang="ts">
import Callout from "../Callout.vue";

const colors = [
	"neutral",
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"error",
	"light",
	"dark",
] as const;
const variants = ["solid", "outline", "soft", "subtle"] as const;
</script>

<template>
	<div class="callout-section">
		<div v-for="variant in variants" :key="variant">
			<div class="callout-label">{{ variant }}</div>
			<div class="callout-row">
				<Callout
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
					:title="`${variant.charAt(0).toUpperCase() + variant.slice(1)} ${color.charAt(0).toUpperCase() + color.slice(1)}`"
					:description="`This is a ${variant} ${color} callout.`"
				/>
			</div>
		</div>
	</div>
</template>
