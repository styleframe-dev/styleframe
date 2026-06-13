<script setup lang="ts">
import Avatar from "../Avatar.vue";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const colors = ["primary", "light", "dark", "neutral"] as const;
const initials: Record<(typeof colors)[number], string> = {
	primary: "PR",
	light: "LT",
	dark: "DK",
	neutral: "NE",
};
</script>

<template>
	<div class="avatar-section">
		<div v-for="size in sizes" :key="size">
			<div class="avatar-label">{{ size }}</div>
			<div class="avatar-row">
				<Avatar
					v-for="color in colors"
					:key="`${size}-${color}`"
					:color="color"
					variant="soft"
					:size="size"
					:label="initials[color]"
				/>
			</div>
		</div>
	</div>
</template>
