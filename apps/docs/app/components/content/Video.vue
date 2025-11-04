<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";

interface Props {
	poster?: string;
	src?: string;
	sources?: string[];
	controls?: boolean;
	autoplay?: boolean;
	loop?: boolean;
	muted?: boolean;
	playsinline?: boolean;
	pauseOnExit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	poster: "",
	src: "",
	sources: undefined,
	controls: false,
	autoplay: false,
	loop: false,
	muted: true,
	playsinline: true,
	pauseOnExit: true,
});

const playing = ref(false);
const loaded = ref(false);
const isIntersecting = ref(false);
const posterLoaded = ref(false);

const videoRef = useTemplateRef<HTMLVideoElement | null>("video");

const { stop } = useIntersectionObserver(
	videoRef,
	([entry], observerElement) => {
		isIntersecting.value = entry?.isIntersecting || false;
	},
);

const allSources = computed(() => props.sources ?? [props.src]);

const lazyPoster = computed(() => {
	if (isIntersecting.value && !posterLoaded.value) {
		posterLoaded.value = true;
		return props.poster;
	} else if (posterLoaded.value) {
		return props.poster;
	} else {
		return "";
	}
});

onUnmounted(() => {
	stop();
});

watch(isIntersecting, (currentValue, previousValue) => {
	// Pause video if it was playing and is no longer intersecting
	if (props.pauseOnExit) {
		if (previousValue && playing.value) {
			videoRef.value?.pause();
		} else if (currentValue && !playing.value) {
			videoRef.value?.play();
		}
	}

	// Load if video is intersecting
	if (currentValue && !loaded.value) {
		videoRef.value?.load();
	}
});

const onPlay = () => {
	playing.value = true;
};

const onPause = () => {
	playing.value = false;
};

const onLoaded = () => {
	loaded.value = true;
};
</script>

<template>
	<video
		ref="video"
		class="w-full h-full object-cover"
		preload="none"
		:poster="lazyPoster"
		:src="allSources[0]"
		:controls="controls"
		:autoplay="autoplay"
		:loop="loop"
		:muted="muted"
		playsinline
		@play="onPlay"
		@pause="onPause"
		@loadeddata="onLoaded"
	>
		<source
			v-for="source in allSources"
			:src="source"
			:key="source"
		/>
	</video>
</template>

