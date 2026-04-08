<script setup lang="ts">
import Tooltip from "../Tooltip.vue";

const colors = ["light", "dark", "neutral"] as const;
const variants = ["solid", "soft", "subtle"] as const;
</script>

<template>
	<div class="tooltip-section">
		<div v-for="variant in variants" :key="variant">
			<div class="tooltip-label">{{ variant }}</div>
			<div class="tooltip-row">
				<Tooltip
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
					:label="color"
				/>
			</div>
		</div>
	</div>
</template>
