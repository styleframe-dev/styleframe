<script setup lang="ts">
import Radio from "../Radio.vue";

const colors = ["neutral", "light", "dark"] as const;
const states = [
	{ label: "unchecked", checked: false, disabled: false },
	{ label: "checked", checked: true, disabled: false },
	{ label: "disabled", checked: false, disabled: true },
	{ label: "disabled checked", checked: true, disabled: true },
] as const;
</script>

<template>
	<div class="radio-section">
		<div v-for="state in states" :key="state.label">
			<div class="radio-label">{{ state.label }}</div>
			<div class="radio-row">
				<Radio
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
