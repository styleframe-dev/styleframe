<template>
	<MorphingGradientBackground v-slot="{ onMousemove }">
		<AppHeader />
		<UMain
			class="flex items-center justify-center"
			@mousemove="onMousemove"
		>
			<UContainer class="py-8">
				<slot />
			</UContainer>
		</UMain>
		<AppFooter />
	</MorphingGradientBackground>
</template>
