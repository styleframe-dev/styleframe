<script setup lang="ts">
import { computed, inject, provide } from "vue";
import { accordionItem } from "virtual:styleframe";
import { accordionItemKey, accordionKey } from "./context";

const props = withDefaults(
	defineProps<{ value: string; disabled?: boolean }>(),
	{ disabled: false },
);

const ctx = inject(accordionKey);

provide(accordionItemKey, {
	value: props.value,
	disabled: computed(() => props.disabled),
});

const classes = computed(() =>
	accordionItem({
		color: ctx?.color.value,
		variant: ctx?.variant.value,
		size: ctx?.size.value,
	}),
);
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
