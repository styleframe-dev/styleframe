<script setup lang="ts">
import Toggle from "../Toggle.vue";

const colors = ["neutral", "light", "dark"] as const;
const states = [
	{ label: "off", checked: false, disabled: false },
	{ label: "on", checked: true, disabled: false },
	{ label: "disabled", checked: false, disabled: true },
	{ label: "disabled on", checked: true, disabled: true },
] as const;
</script>

<template>
	<div class="toggle-section">
		<div v-for="state in states" :key="state.label">
			<div class="toggle-label">{{ state.label }}</div>
			<div class="toggle-row">
				<Toggle
					v-for="color in colors"
					:key="`${state.label}-${color}`"
					:color="color"
					:checked="state.checked"
					:disabled="state.disabled"
					:label="color"
				/>
			</div>
		</div>
	</div>
</template>
