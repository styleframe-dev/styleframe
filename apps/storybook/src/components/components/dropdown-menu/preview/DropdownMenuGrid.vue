<script setup lang="ts">
import DropdownMenu from "../DropdownMenu.vue";
import DropdownItem from "../DropdownItem.vue";
import DropdownDivider from "../DropdownDivider.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["solid", "soft", "subtle"] as const;
</script>

<template>
	<div class="dropdown-menu-section">
		<div v-for="variant in variants" :key="variant">
			<div class="dropdown-menu-label">{{ variant }}</div>
			<div class="dropdown-menu-row">
				<DropdownMenu
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
					style="min-width: 180px"
				>
					<DropdownItem :color="color" :variant="variant" label="Action" />
					<DropdownItem :color="color" :variant="variant" label="Another action" />
					<DropdownDivider :color="color" :variant="variant" />
					<DropdownItem :color="color" :variant="variant" label="Something else" />
				</DropdownMenu>
			</div>
		</div>
	</div>
</template>
