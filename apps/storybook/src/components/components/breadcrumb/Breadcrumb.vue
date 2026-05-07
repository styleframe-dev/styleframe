<script setup lang="ts">
import { breadcrumb } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
		separator?: string;
	}>(),
	{
		separator: "/",
	},
);

const slots = defineSlots<{ default(): unknown }>();
</script>

<template>
	<nav aria-label="Breadcrumb">
		<ol
			:class="
				breadcrumb({
					size: props.size,
				})
			"
		>
			<template v-for="(child, i) in slots.default()" :key="i">
				<li v-if="i > 0" aria-hidden="true">
					<span class="breadcrumb-separator">{{ props.separator }}</span>
				</li>
				<component :is="child" />
			</template>
		</ol>
	</nav>
</template>
