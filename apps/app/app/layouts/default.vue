<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[][]>([
	[
		{
			label: "Dashboard",
			type: "label",
		},
		{
			label: "Activate License",
			icon: "i-lucide-key",
			active: true,
		},
	],
	[
		{
			label: "Customer Portal",
			icon: "i-lucide-user-star",
			to: "https://polar.sh/styleframe/portal",
			target: "_blank",
		},
	],
]);
</script>

<template>
	<UMain>
		<AppHeader />
		<UContainer>
			<UPage>
				<template #left>
					<UPageAside>
						<UNavigationMenu
							orientation="vertical"
							:items="items"
							class="data-[orientation=vertical]:w-48"
						/>
					</UPageAside>
				</template>
				<slot />
			</UPage>
		</UContainer>
		<AppFooter />
	</UMain>
</template>
