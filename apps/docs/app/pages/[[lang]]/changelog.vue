<script setup lang="ts">
definePageMeta({
	layout: "default",
});

// One static page. Every entry — metadata and body — is fetched up front and
// prerendered into the HTML, so in-page search (Ctrl-F), SEO crawlers, and
// no-JS readers all see the full changelog. At 17 short entries the DOM weight
// is trivial; if it ever bites at hundreds of entries, reach for CSS
// `content-visibility: auto` before any JS windowing — it keeps Ctrl-F working.
const { data: entries } = await useAsyncData("changelog", () =>
	queryCollection("changelog").order("date", "DESC").all(),
);

const formatDate = (date: string) =>
	new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date));

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
			<article
				v-for="entry in entries"
				:key="entry.path"
				class="flex flex-col gap-4 border-t border-default py-12 lg:flex-row lg:gap-12"
			>
				<div class="lg:w-48 lg:shrink-0">
					<div class="lg:sticky lg:top-24">
						<UBadge
							:label="`v${entry.version}`"
							color="primary"
							variant="subtle"
							size="lg"
						/>
						<time :datetime="entry.date" class="mt-2 block text-sm text-muted">
							{{ formatDate(entry.date) }}
						</time>
					</div>
				</div>

				<div class="min-w-0 flex-1">
					<h2 class="mb-4 text-2xl font-semibold text-highlighted">
						{{ entry.title }}
					</h2>
					<ContentRenderer
						:value="entry"
						class="prose prose-primary max-w-none"
					/>
				</div>
			</article>
		</div>
	</UContainer>
</template>
