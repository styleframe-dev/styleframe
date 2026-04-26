<script setup lang="ts">
import HamburgerMenu from "../HamburgerMenu.vue";

const colors = ["light", "dark", "neutral"] as const;
const animations = [
	"close",
	"arrow-up",
	"arrow-down",
	"arrow-left",
	"arrow-right",
	"minus",
	"plus",
] as const;
</script>

<template>
	<div class="hamburger-menu-section">
		<div v-for="color in colors" :key="color">
			<div class="hamburger-menu-label">{{ color }}</div>
			<div class="hamburger-menu-row">
				<HamburgerMenu
					v-for="animation in animations"
					:key="animation"
					:color="color"
					:animation="animation"
				/>
			</div>
		</div>
	</div>
</template>
