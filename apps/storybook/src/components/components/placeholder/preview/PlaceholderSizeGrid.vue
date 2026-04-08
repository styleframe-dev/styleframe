<script setup lang="ts">
import Placeholder from "../Placeholder.vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
	<div class="placeholder-section">
		<div v-for="size in sizes" :key="size">
			<div class="placeholder-label">{{ size }}</div>
			<div class="placeholder-row">
				<Placeholder :size="size">
					{{ size }} placeholder
				</Placeholder>
			</div>
		</div>
	</div>
</template>
