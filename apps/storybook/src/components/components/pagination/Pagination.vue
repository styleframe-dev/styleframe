<script setup lang="ts">
import { pagination } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		orientation?: "horizontal" | "vertical";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);
</script>

<template>
	<nav
		:class="
			pagination({
				orientation: props.orientation,
				size: props.size,
			})
		"
		role="navigation"
		aria-label="Pagination"
	>
		<slot />
	</nav>
</template>
