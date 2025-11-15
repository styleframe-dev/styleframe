<script setup lang="ts">
defineOptions({
	inheritAttrs: false,
});
</script>

<template>
	<MorphingGradientBackground v-slot="{ onMousemove }">
		<UPageHero v-bind="$attrs" @mousemove="onMousemove">
			<slot />
			<template #title><slot name="title" /></template>
			<template #description><slot name="description" /></template>
			<template #headline><slot name="headline" /></template>
			<template #links><slot name="links" /></template>
		</UPageHero>
	</MorphingGradientBackground>
</template>
