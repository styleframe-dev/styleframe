<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[][]>([
	[
		{
			label: "Dashboard",
			type: "label",
		},
		{
			label: "Projects",
			icon: "i-lucide-folder",
			to: "/dashboard",
		},
		{
			label: "Activate License",
			icon: "i-lucide-key",
			to: "/",
		},
	],
	[
		{
			label: "Customer Portal",
			icon: "i-lucide-user-star",
			to: "https://polar.sh/styleframe/portal",
			target: "_blank",
		},
		{
			label: "Log Out",
			icon: "i-lucide-log-out",
			to: "/logout",
		},
	],
]);
</script>

<template>
	<UPageAside>
		<UNavigationMenu
			orientation="vertical"
			:items="items"
			class="data-[orientation=vertical]:w-48"
		/>
	</UPageAside>
</template>
