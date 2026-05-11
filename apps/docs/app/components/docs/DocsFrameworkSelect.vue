<script setup lang="ts">
const { framework, frameworks } = useFramework();

const current = computed(
	() =>
		frameworks.find((option) => option.value === framework.value) ??
		frameworks[0],
);
</script>

<template>
	<USelect
		v-model="framework"
		:items="[...frameworks]"
		variant="ghost"
		color="neutral"
		:icon="current.icon"
		class="w-full"
	/>
</template>
