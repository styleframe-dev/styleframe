<script setup lang="ts">
const route = useRoute();
const namespace = computed(() => route.params.namespace as string | undefined);
</script>

<template>
	<AppHeader />
	<UMain class="flex flex-col">
		<UContainer class="flex-1">
			<UPage>
				<template #left>
					<ProjectSidebar />
				</template>
				<slot />
				<template v-if="namespace" #right>
					<DesignTokensSidebar :namespace="namespace" />
				</template>
			</UPage>
		</UContainer>
		<AppFooter />
	</UMain>
</template>
