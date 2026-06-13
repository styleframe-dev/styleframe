<script setup lang="ts">
import ColorPicker from "../ColorPicker.vue";

const states = [
	{ label: "default", disabled: false },
	{ label: "disabled", disabled: true },
] as const;
</script>

<template>
	<div class="color-picker-section">
		<div v-for="state in states" :key="state.label">
			<div class="color-picker-label">{{ state.label }}</div>
			<div class="color-picker-row">
				<ColorPicker :disabled="state.disabled" />
			</div>
		</div>
	</div>
</template>
