<script setup lang="ts">
const props = defineProps<{
	path: string;
	version: string;
	date: string;
	title: string;
}>();

// The body is fetched lazily, keyed by path, so a release only pays its full
// content cost once it scrolls into the visible window.
const { data: entry } = await useAsyncData(`changelog:${props.path}`, () =>
	queryCollection("changelog").path(props.path).first(),
);

const formattedDate = computed(() =>
	new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(props.date)),
);
</script>

<template>
	<article
		class="flex flex-col gap-4 border-t border-default py-12 lg:flex-row lg:gap-12"
	>
		<div class="lg:w-48 lg:shrink-0">
			<div class="lg:sticky lg:top-24">
				<UBadge
					:label="`v${version}`"
					color="primary"
					variant="subtle"
					size="lg"
				/>
				<time :datetime="date" class="mt-2 block text-sm text-muted">
					{{ formattedDate }}
				</time>
			</div>
		</div>

		<div class="min-w-0 flex-1">
			<h2 class="mb-4 text-2xl font-semibold text-highlighted">
				{{ title }}
			</h2>
			<ContentRenderer
				v-if="entry"
				:value="entry"
				class="prose prose-primary max-w-none"
			/>
		</div>
	</article>
</template>
