<script setup lang="ts">
import MorphingGradientBackground from "~/components/other/MorphingGradientBackground.vue";

defineOptions({
	inheritAttrs: false,
});
</script>

<template>
	<MorphingGradientBackground v-slot="{ mousemove }">
		<UPageHero v-bind="$attrs" @mousemove="mousemove">
			<slot />
			<template #title><slot name="title" /></template>
			<template #description><slot name="description" /></template>
			<template #headline><slot name="headline" /></template>
			<template #links><slot name="links" /></template>
		</UPageHero>
	</MorphingGradientBackground>
</template>

