<script setup lang="ts">
import { fieldGroup } from "virtual:styleframe";

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
			fieldGroup({
				orientation: props.orientation,
				block: props.block ? 'true' : 'false',
			})
		"
	>
		<slot />
	</div>
</template>
