<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { checkbox, checkboxField } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		size?: "sm" | "md" | "lg";
		checked?: boolean;
		indeterminate?: boolean;
		disabled?: boolean;
		label?: string;
	}>(),
	{
		size: "md",
	},
);

const fieldRef = ref<HTMLInputElement | null>(null);

const wrapperClasses = computed(() => checkbox({ size: props.size }));
const fieldClasses = computed(() =>
	checkboxField({ color: props.color, size: props.size }),
);

function syncIndeterminate() {
	if (fieldRef.value) {
		fieldRef.value.indeterminate = Boolean(props.indeterminate);
	}
}

onMounted(syncIndeterminate);
watch(() => props.indeterminate, syncIndeterminate);
</script>

<template>
	<label :class="wrapperClasses">
		<input
			ref="fieldRef"
			type="checkbox"
			:class="fieldClasses"
			:checked="checked"
			:disabled="disabled"
		/>
		<span v-if="$slots.default || label"><slot>{{ label }}</slot></span>
	</label>
</template>
