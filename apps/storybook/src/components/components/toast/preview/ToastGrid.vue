<script setup lang="ts">
import Toast from "../Toast.vue";

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
	<div class="toast-section">
		<div v-for="variant in variants" :key="variant">
			<div class="toast-label">{{ variant }}</div>
			<div class="toast-row">
				<Toast
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
					:title="`${variant.charAt(0).toUpperCase() + variant.slice(1)} ${color.charAt(0).toUpperCase() + color.slice(1)}`"
					:description="`This is a ${variant} ${color} toast.`"
				/>
			</div>
		</div>
	</div>
</template>
