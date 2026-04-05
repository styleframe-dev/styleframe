<script setup lang="ts">
import Tooltip from "../Tooltip.vue";

const colors = ["light", "dark", "neutral"] as const;
const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
	<div class="tooltip-section">
		<div v-for="size in sizes" :key="size">
			<div class="tooltip-label">{{ size }}</div>
			<div class="tooltip-row">
				<Tooltip
					v-for="color in colors"
					:key="`${size}-${color}`"
					:color="color"
					:size="size"
					:label="color"
				/>
			</div>
		</div>
	</div>
</template>
