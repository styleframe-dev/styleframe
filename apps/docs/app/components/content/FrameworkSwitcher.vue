<script setup lang="ts">
const { framework, frameworks } = useFramework();
const slots = useSlots();

const current = computed(
	() =>
		frameworks.find((f) => f.value === framework.value) ?? frameworks[0],
);

const fallback = computed(() => {
	if (slots[framework.value]) return null;
	return frameworks.find((f) => slots[f.value]) ?? null;
});
</script>

<template>
	<div class="framework-switcher">
		<p v-if="fallback" class="text-sm text-muted mb-2">
			Not available for {{ current.label }} — showing {{ fallback.label }}.
		</p>
		<slot v-if="!fallback" :name="framework" />
		<slot v-else :name="fallback.value" />
	</div>
</template>
