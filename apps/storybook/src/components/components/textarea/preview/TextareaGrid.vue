<script setup lang="ts">
import Textarea from "../Textarea.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["default", "soft", "ghost"] as const;
</script>

<template>
	<div class="textarea-section">
		<div v-for="variant in variants" :key="variant">
			<div class="textarea-label">{{ variant }}</div>
			<div class="textarea-row">
				<Textarea
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
					:rows="3"
					:placeholder="`${variant} ${color}`"
				/>
			</div>
		</div>
	</div>
</template>
