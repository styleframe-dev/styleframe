<script setup lang="ts">
interface Props {
	story: string;
	height?: number | string;
	panel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	height: undefined,
	panel: false,
});

const baseUrl = import.meta.dev
	? "http://localhost:6006"
	: "https://storybook.styleframe.dev";

const defaultHeight = computed(() => (props.panel ? 420 : 240));
const iframeHeight = computed(() => props.height ?? defaultHeight.value);

const src = computed(() =>
	props.panel
		? `${baseUrl}/?path=/story/${props.story}&shortcuts=false&singleStory=true`
		: `${baseUrl}/?path=/story/${props.story}&full=1&shortcuts=false&singleStory=true`
);
</script>

<template>
	<div
		class="story-preview"
		:style="{ height: `${iframeHeight}px` }"
	>
		<iframe
			:src="src"
			width="100%"
			height="100%"
			frameborder="0"
		/>
	</div>
</template>

<style scoped>
.story-preview {
	border: 1px solid var(--color-gray-200);
	border-radius: 8px;
	overflow: hidden;
	resize: vertical;
	min-height: 300px;
}

.story-preview iframe {
	display: block;
}
</style>
