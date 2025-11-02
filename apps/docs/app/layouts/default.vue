<script setup lang="ts">
const route = useRoute();
const isDocs = computed(() => route.path.startsWith("/docs"));
</script>

<template>
	<AppHeader />
	<UMain>
		<slot v-if="!isDocs" />
		<UContainer v-else>
			<UPage>
				<template #left>
					<UPageAside>
						<DocsAsideLeftTop />

						<DocsAsideLeftBody />
					</UPageAside>
				</template>

				<slot />
			</UPage>
		</UContainer>
	</UMain>
	<AppFooter />
</template>
