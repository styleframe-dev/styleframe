<script setup lang="ts">
import Otp from "../Otp.vue";

const sizes = ["sm", "md", "lg"] as const;
const sizeTitles: Record<string, string> = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
};
</script>

<template>
	<div class="otp-section">
		<div v-for="size in sizes" :key="size">
			<div class="otp-label">{{ sizeTitles[size] }}</div>
			<div class="otp-row">
				<Otp :size="size" :length="4" value="12" />
			</div>
		</div>
	</div>
</template>
