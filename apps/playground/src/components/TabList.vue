<script setup lang="ts" generic="T extends string">
import { pgTab, pgTabList } from "virtual:styleframe";

defineProps<{
	modelValue: T;
	tabs: ReadonlyArray<{ id: T; label: string }>;
}>();

const emit = defineEmits<{ "update:modelValue": [value: T] }>();
</script>

<template>
	<div :class="pgTabList()" role="tablist">
		<button
			v-for="tab in tabs"
			:key="tab.id"
			type="button"
			role="tab"
			:aria-selected="modelValue === tab.id"
			:class="pgTab({ state: modelValue === tab.id ? 'active' : 'inactive' })"
			@click="emit('update:modelValue', tab.id)"
		>
			{{ tab.label }}
		</button>
	</div>
</template>
