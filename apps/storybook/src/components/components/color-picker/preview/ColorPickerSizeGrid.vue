<script setup lang="ts">
import ColorPicker from "../ColorPicker.vue";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
	<div class="color-picker-section">
		<div class="color-picker-row">
			<div v-for="size in sizes" :key="size">
				<div class="color-picker-label">{{ size }}</div>
				<ColorPicker :size="size" />
			</div>
		</div>
	</div>
</template>
