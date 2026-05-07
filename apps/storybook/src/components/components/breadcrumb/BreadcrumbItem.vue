<script setup lang="ts">
import { computed } from "vue";
import { breadcrumbItem } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		size?: "sm" | "md" | "lg";
		active?: boolean;
		disabled?: boolean;
		href?: string;
	}>(),
	{},
);

const tag = computed(() => (props.active ? "span" : "a"));
</script>

<template>
	<li>
		<component
			:is="tag"
			:class="
				breadcrumbItem({
					color: props.color,
					size: props.size,
					active: props.active ? 'true' : 'false',
					disabled: props.disabled ? 'true' : 'false',
				})
			"
			:href="!props.active ? props.href : undefined"
			:aria-current="props.active ? 'page' : undefined"
			:aria-disabled="props.disabled || undefined"
		>
			<slot />
		</component>
	</li>
</template>
