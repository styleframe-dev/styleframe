<script setup lang="ts">
import { kebabCase } from "scule";

definePageMeta({
	layout: "default",
});

const route = useRoute();

const { data: page } = await useAsyncData(kebabCase(route.path), () =>
	queryCollection("landing").path(route.path).first(),
);

if (!page.value) {
	throw createError({
		statusCode: 404,
		statusMessage: "Page not found",
		fatal: true,
	});
}

// Add the page path to the prerender list
addPrerenderPath(`/raw${route.path}.md`);

// Reconsider it once this is implemented: https://github.com/nuxt/content/issues/3419
const prose = page.value.meta.prose;
const title = page.value.seo?.title || page.value.title;
const description = page.value.seo?.description || page.value.description;

useSeoMeta({
	title,
	description,
	ogTitle: title,
	ogDescription: description,
});

if (page.value?.seo?.ogImage) {
	useSeoMeta({
		ogImage: page.value.seo.ogImage,
		twitterImage: page.value.seo.ogImage,
	});
} else {
	defineOgImageComponent("Landing", {
		title,
		description,
	});
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
    :prose="prose || false"
  />
</template>
