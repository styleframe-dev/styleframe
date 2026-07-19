<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";

definePageMeta({
	layout: "default",
});

// The list itself is cheap: one query for every entry's metadata, no bodies.
// Bodies are pulled per entry, only once an entry enters the visible window
// (see ChangelogEntry), so the page never ships one giant payload.
const { data: index } = await useAsyncData("changelog-index", () =>
	queryCollection("changelog")
		.order("date", "DESC")
		.select("path", "version", "date", "title")
		.all(),
);

const entries = computed(() => index.value ?? []);

// Reveal a few entries at a time as the reader scrolls, so bodies stream in
// incrementally rather than all mounting at once.
const STEP = 5;
const visibleCount = ref(STEP);
const visibleEntries = computed(() => entries.value.slice(0, visibleCount.value));
const done = computed(() => visibleCount.value >= entries.value.length);

const sentinel = ref<HTMLElement | null>(null);
useIntersectionObserver(sentinel, ([entry]) => {
	if (entry?.isIntersecting && !done.value) {
		visibleCount.value = Math.min(visibleCount.value + STEP, entries.value.length);
	}
});

const title = "Changelog";
const description =
	"Everything new in Styleframe — recipes, engine improvements, and tooling, release by release.";

useSeoMeta({
	title,
	description,
	ogTitle: title,
	ogDescription: description,
});

defineOgImage("DocsSatori", {
	headline: "styleframe",
	title,
	description,
});
</script>

<template>
	<UContainer class="py-12 lg:py-16">
		<div class="mb-8 max-w-2xl">
			<h1 class="text-3xl font-bold text-highlighted sm:text-4xl">Changelog</h1>
			<p class="mt-3 text-base text-muted">
				{{ description }}
			</p>
		</div>

		<div>
			<ChangelogEntry
				v-for="entry in visibleEntries"
				:key="entry.path"
				:path="entry.path"
				:version="entry.version"
				:date="entry.date"
				:title="entry.title"
			/>
		</div>

		<div ref="sentinel" class="h-px w-full" />

		<p v-if="done" class="py-8 text-center text-sm text-muted">
			You've reached the beginning.
		</p>
	</UContainer>
</template>
