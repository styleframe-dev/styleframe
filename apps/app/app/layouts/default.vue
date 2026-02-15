<template>
	<AppHeader />
	<UMain class="flex flex-col">
		<UContainer class="flex-1">
			<UPage>
				<template #left>
					<AppSidebar />
				</template>
				<slot />
			</UPage>
		</UContainer>
		<AppFooter />
	</UMain>
</template>
