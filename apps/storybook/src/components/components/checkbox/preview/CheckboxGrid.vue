<script setup lang="ts">
import Checkbox from "../Checkbox.vue";

const colors = ["neutral", "light", "dark"] as const;
const states = [
	{ label: "unchecked", checked: false, indeterminate: false, disabled: false },
	{ label: "checked", checked: true, indeterminate: false, disabled: false },
	{
		label: "indeterminate",
		checked: false,
		indeterminate: true,
		disabled: false,
	},
	{ label: "disabled", checked: false, indeterminate: false, disabled: true },
	{
		label: "disabled checked",
		checked: true,
		indeterminate: false,
		disabled: true,
	},
] as const;
</script>

<template>
	<div class="checkbox-section">
		<div v-for="state in states" :key="state.label">
			<div class="checkbox-label">{{ state.label }}</div>
			<div class="checkbox-row">
				<Checkbox
					v-for="color in colors"
					:key="`${state.label}-${color}`"
					:color="color"
					:checked="state.checked"
					:indeterminate="state.indeterminate"
					:disabled="state.disabled"
					:label="color"
				/>
			</div>
		</div>
	</div>
</template>
