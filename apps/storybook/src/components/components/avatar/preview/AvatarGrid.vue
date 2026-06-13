<script setup lang="ts">
import Avatar from "../Avatar.vue";

const colors = ["primary", "light", "dark", "neutral"] as const;
const variants = ["solid", "soft"] as const;
const initials: Record<(typeof colors)[number], string> = {
	primary: "PR",
	light: "LT",
	dark: "DK",
	neutral: "NE",
};
</script>

<template>
	<div class="avatar-section">
		<div v-for="variant in variants" :key="variant">
			<div class="avatar-label">{{ variant }}</div>
			<div class="avatar-row">
				<Avatar
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
					size="md"
					:label="initials[color]"
				/>
			</div>
		</div>
	</div>
</template>
