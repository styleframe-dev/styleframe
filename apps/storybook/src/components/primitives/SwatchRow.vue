<script setup lang="ts">

defineProps<{
	name: string;
	value: string;
	uppercase?: boolean;
}>();
</script>

<template>
	<div class="swatch-row">
		<div
			:class="[
				'swatch-row__name',
				{ 'swatch-row__name--uppercase': uppercase },
			]"
		>
			{{ name }}
		</div>
		<div class="swatch-row__value">{{ value }}</div>
		<div class="swatch-row__content">
			<slot />
		</div>
	</div>
</template>
