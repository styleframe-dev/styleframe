<script setup lang="ts">

defineProps<{
	name: string;
	label?: string;
	previewClass?: string;
}>();
</script>

<template>
	<div class="swatch-card">
		<div class="swatch-card__body">
			<slot>
				<div :class="['swatch-card__preview', previewClass]" />
			</slot>
		</div>
		<div class="swatch-card__footer">
			<span class="swatch-card__name">{{ name }}</span>
			<span v-if="label" class="swatch-card__label">{{ label }}</span>
		</div>
	</div>
</template>
