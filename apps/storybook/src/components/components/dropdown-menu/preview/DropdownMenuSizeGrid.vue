<script setup lang="ts">
import DropdownMenu from "../DropdownMenu.vue";
import DropdownItem from "../DropdownItem.vue";
import DropdownDivider from "../DropdownDivider.vue";

const colors = ["neutral", "light", "dark"] as const;
const sizes = ["sm", "md", "lg"] as const;
const sizeTitles: Record<string, string> = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
};
</script>

<template>
	<div class="dropdown-menu-section">
		<div v-for="size in sizes" :key="size">
			<div class="dropdown-menu-label">{{ size }}</div>
			<div class="dropdown-menu-row">
				<DropdownMenu
					v-for="color in colors"
					:key="`${size}-${color}`"
					:color="color"
					:size="size"
					style="min-width: 180px"
				>
					<DropdownItem :color="color" :size="size" :label="`${sizeTitles[size]} action`" />
					<DropdownItem :color="color" :size="size" label="Another action" />
					<DropdownDivider :color="color" />
					<DropdownItem :color="color" :size="size" label="Something else" />
				</DropdownMenu>
			</div>
		</div>
	</div>
</template>
