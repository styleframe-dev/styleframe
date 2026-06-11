<script setup lang="ts">
import { computed, inject } from "vue";
import { accordionBody, accordionContent } from "virtual:styleframe";
import { accordionItemKey, accordionKey } from "./context";

const ctx = inject(accordionKey);
const item = inject(accordionItemKey);

const open = computed(
	() => !!item && !!ctx && ctx.openValues.value.includes(item.value),
);

const contentClasses = computed(() =>
	accordionContent({
		color: ctx?.color.value,
		variant: ctx?.variant.value,
		size: ctx?.size.value,
	}),
);

const bodyClasses = computed(() =>
	accordionBody({
		color: ctx?.color.value,
		variant: ctx?.variant.value,
		size: ctx?.size.value,
	}),
);
</script>

<template>
	<div :class="contentClasses" :data-state="open ? 'open' : 'closed'">
		<div :class="bodyClasses">
			<slot />
		</div>
	</div>
</template>
