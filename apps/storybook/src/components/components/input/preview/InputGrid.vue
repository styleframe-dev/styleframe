<script setup lang="ts">
import Input from "../Input.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["default", "soft", "ghost"] as const;
</script>

<template>
	<div class="input-section">
		<div v-for="variant in variants" :key="variant">
			<div class="input-label">{{ variant }}</div>
			<div class="input-row">
				<Input
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
					:placeholder="`${variant} ${color}`"
				/>
			</div>
		</div>
	</div>
</template>
