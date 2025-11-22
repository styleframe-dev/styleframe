<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import { kebabCase } from "scule";

definePageMeta({
	layout: "default",
});

const route = useRoute();
const { locale, isEnabled } = useDocusI18n();

// Dynamic collection name based on i18n status
const collectionName = computed(() =>
	isEnabled.value ? `landing_${locale.value}` : "landing",
);

const { data: page } = await useAsyncData(kebabCase(route.path), () =>
	queryCollection(collectionName.value as keyof Collections)
		.path(route.path)
		.first(),
);
if (!page.value) {
	throw createError({
		statusCode: 404,
		statusMessage: "Page not found",
		fatal: true,
	});
}

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
	defineOgImageComponent("Docs", {
		headline: "styleframe",
		title,
		description,
	});
}
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
</template>
