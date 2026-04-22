<script setup lang="ts" generic="T extends string">
import { pgFileTab, pgFileTabDot, pgFileTabList } from "virtual:styleframe";

export interface FileTabEntry<Id extends string> {
	id: Id;
	label: string;
}

defineProps<{
	modelValue: T;
	tabs: ReadonlyArray<FileTabEntry<T>>;
	dirty?: Partial<Record<T, boolean>>;
}>();

const emit = defineEmits<{
	"update:modelValue": [value: T];
}>();
</script>

<template>
	<div :class="pgFileTabList()" role="tablist">
		<button
			v-for="tab in tabs"
			:key="tab.id"
			type="button"
			role="tab"
			:aria-selected="modelValue === tab.id"
			:class="
				pgFileTab({ state: modelValue === tab.id ? 'active' : 'inactive' })
			"
			@click="emit('update:modelValue', tab.id)"
		>
			<span
				v-if="dirty?.[tab.id]"
				:class="pgFileTabDot()"
				aria-label="Edited"
			/>
			<span>{{ tab.label }}</span>
		</button>
	</div>
</template>
