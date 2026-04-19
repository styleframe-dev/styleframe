<script setup lang="ts">
import HamburgerMenu from "../HamburgerMenu.vue";

const animations = [
	"close",
	"arrow-left",
	"arrow-right",
	"arrow-up",
	"arrow-down",
	"plus",
	"minus",
] as const;
</script>

<template>
	<div class="hamburger-menu-section">
		<div v-for="animation in animations" :key="animation">
			<div class="hamburger-menu-label">{{ animation }}</div>
			<div class="hamburger-menu-row">
				<HamburgerMenu :animation="animation" />
			</div>
		</div>
	</div>
</template>
