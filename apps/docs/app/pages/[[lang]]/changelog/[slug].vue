<script setup lang="ts">
definePageMeta({
	layout: "default",
});

// One page per released version, deep-linkable and prerendered. The body is
// fetched up front (no client-only gating), so the full release notes live in
// the static HTML — searchable, crawlable, and readable with no JS. The
// `/changelog` index links here; the prerender crawler follows those links to
// bake one file per version.
const route = useRoute();
const slug = computed(() => String(route.params.slug));

const { data: entry } = await useAsyncData(
	`changelog-${slug.value}`,
	() =>
		queryCollection("changelog").path(`/changelog/${slug.value}`).first(),
);

if (!entry.value) {
	throw createError({
		statusCode: 404,
		statusMessage: "Page not found",
		fatal: true,
	});
}

const formatDate = (date: string) =>
	new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date));

const title = `${entry.value.title} — v${entry.value.version}`;
const description = entry.value.description;

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
	<UContainer v-if="entry" class="py-12 lg:py-16">
		<div class="mx-auto max-w-2xl">
			<NuxtLink
				to="/changelog"
				class="inline-flex items-center gap-1 text-sm text-muted hover:text-default"
			>
				<UIcon name="i-lucide-arrow-left" class="size-4" />
				Back to changelog
			</NuxtLink>

			<div class="mt-6 flex items-center gap-3">
				<UBadge
					:label="`v${entry.version}`"
					color="primary"
					variant="subtle"
					size="lg"
				/>
				<time :datetime="entry.date" class="text-sm text-muted">
					{{ formatDate(entry.date) }}
				</time>
			</div>

			<h1 class="mt-4 text-3xl font-bold text-highlighted sm:text-4xl">
				{{ entry.title }}
			</h1>

			<ContentRenderer
				:value="entry"
				class="prose prose-primary mt-8 max-w-none"
			/>
		</div>
	</UContainer>
</template>
