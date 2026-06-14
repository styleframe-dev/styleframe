<script setup lang="ts">
import Toggle from "../Toggle.vue";

const colors = ["light", "dark", "neutral"] as const;
const variants = ["solid", "outline", "ghost"] as const;
const states = [
	{ name: "off", pressed: false, disabled: false },
	{ name: "on", pressed: true, disabled: false },
	{ name: "disabled", pressed: false, disabled: true },
] as const;

const rows = variants.flatMap((variant) =>
	states.map((state) => ({
		variant,
		state,
		label: `${variant} · ${state.name}`,
	})),
);
</script>

<template>
	<div class="toggle-section">
		<div v-for="row in rows" :key="row.label">
			<div class="toggle-label">{{ row.label }}</div>
			<div class="toggle-row">
				<Toggle
					v-for="color in colors"
					:key="`${row.label}-${color}`"
					:color="color"
					:variant="row.variant"
					:pressed="row.state.pressed"
					:disabled="row.state.disabled"
					:label="color"
				/>
			</div>
		</div>
	</div>
</template>
