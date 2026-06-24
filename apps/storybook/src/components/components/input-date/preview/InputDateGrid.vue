<script setup lang="ts">
import InputDate from "../InputDate.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["default", "soft", "ghost"] as const;
</script>

<template>
	<div class="input-date-section">
		<div v-for="variant in variants" :key="variant">
			<div class="input-date-label">{{ variant }}</div>
			<div class="input-date-row">
				<InputDate
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
				/>
			</div>
		</div>
	</div>
</template>
