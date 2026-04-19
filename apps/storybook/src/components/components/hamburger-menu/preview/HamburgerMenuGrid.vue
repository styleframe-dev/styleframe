<script setup lang="ts">
import HamburgerMenu from "../HamburgerMenu.vue";

const colors = ["light", "dark", "neutral"] as const;
</script>

<template>
	<div class="hamburger-menu-section">
		<div v-for="color in colors" :key="color">
			<div class="hamburger-menu-label">{{ color }}</div>
			<div class="hamburger-menu-row">
				<HamburgerMenu :color="color" />
			</div>
		</div>
	</div>
</template>
