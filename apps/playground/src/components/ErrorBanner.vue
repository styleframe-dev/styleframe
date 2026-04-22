<script setup lang="ts">
import {
	pgErrorBanner,
	pgErrorBannerClose,
	pgErrorBannerMessage,
} from "virtual:styleframe";

defineProps<{ message: string }>();
const emit = defineEmits<{ dismiss: [] }>();
</script>

<template>
	<div :class="pgErrorBanner()" role="alert">
		<div :class="pgErrorBannerMessage()">{{ message }}</div>
		<button
			type="button"
			:class="pgErrorBannerClose()"
			aria-label="Dismiss error"
			@click="emit('dismiss')"
		>
			×
		</button>
	</div>
</template>
