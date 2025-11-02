<script setup lang="ts">
import MorphingGradientBackground from "~/components/other/MorphingGradientBackground.vue";
</script>

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
