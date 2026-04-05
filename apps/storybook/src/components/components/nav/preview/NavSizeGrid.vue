<script setup lang="ts">
import Nav from "../Nav.vue";
import NavItem from "../NavItem.vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
	<div class="nav-section">
		<div v-for="size in sizes" :key="size">
			<div class="nav-label">{{ size }}</div>
			<Nav :size="size">
				<NavItem :size="size" href="#">Home</NavItem>
				<NavItem :size="size" href="#" active>About</NavItem>
				<NavItem :size="size" href="#">Contact</NavItem>
				<NavItem :size="size" href="#" disabled>Disabled</NavItem>
			</Nav>
		</div>
	</div>
</template>
