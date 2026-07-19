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

const releaseUrl = useChangelogReleaseUrl();

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
		<div class="mx-auto max-w-2xl">
			<div class="mb-8">
				<h1 class="text-3xl font-bold text-highlighted sm:text-4xl">
					Changelog
				</h1>
				<p class="mt-3 text-base text-muted">
					{{ description }}
				</p>
			</div>

			<article
				v-for="entry in entries"
				:key="entry.path"
				class="border-t border-default py-12"
			>
				<div class="flex items-center gap-3">
					<NuxtLink :to="entry.path">
						<UBadge
							:label="`v${entry.version}`"
							color="primary"
							variant="subtle"
							size="lg"
						/>
					</NuxtLink>
					<time :datetime="entry.date" class="text-sm text-muted">
						{{ formatDate(entry.date) }}
					</time>
				</div>

				<h2 class="mt-4 text-2xl font-semibold text-highlighted">
					<NuxtLink :to="entry.path" class="hover:text-primary">
						{{ entry.title }}
					</NuxtLink>
				</h2>

				<ContentRenderer
					:value="entry"
					class="prose prose-primary mt-4 max-w-none"
				/>

				<NuxtLink
					:to="releaseUrl(entry)"
					target="_blank"
					rel="noopener"
					class="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
				>
					<UIcon name="i-simple-icons-github" class="size-4" />
					View the v{{ entry.version }} release on GitHub
					<UIcon name="i-lucide-arrow-up-right" class="size-3.5" />
				</NuxtLink>
			</article>
		</div>
	</UContainer>
</template>
