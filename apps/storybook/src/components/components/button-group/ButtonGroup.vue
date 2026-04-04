<script setup lang="ts">
import { buttonGroup } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		orientation?: "horizontal" | "vertical";
		block?: boolean;
	}>(),
	{},
);
</script>

<template>
	<div
		:class="
			buttonGroup({
				orientation: props.orientation,
				block: props.block ? 'true' : 'false',
			})
		"
	>
		<slot />
	</div>
</template>
