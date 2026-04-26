<script setup lang="ts">
import HamburgerMenu from "../HamburgerMenu.vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
	<div class="hamburger-menu-section">
		<div v-for="size in sizes" :key="size">
			<div class="hamburger-menu-label">{{ size }}</div>
			<div class="hamburger-menu-row">
				<HamburgerMenu :size="size" />
			</div>
		</div>
	</div>
</template>
