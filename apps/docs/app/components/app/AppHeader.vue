<script setup lang="ts">
import { useResizeObserver } from "@vueuse/core";
import { useDocusI18n } from "../../composables/useDocusI18n";

const appConfig = useAppConfig();
const site = useSiteConfig();

const { localePath, isEnabled, locales } = useDocusI18n();

const route = useRoute();
const isDocs = computed(() => route.path.startsWith("/docs"));

const headerEl = ref<HTMLElement | null>(null);

onMounted(() => {
	headerEl.value = document.querySelector<HTMLElement>("header");
});

useResizeObserver(headerEl, ([entry]) => {
	if (!isDocs.value) return;
	const height = entry.contentRect.height;
	if (height > 0) {
		document.documentElement.style.setProperty(
			"--ui-header-height",
			`${height}px`,
		);
	}
});

watch(isDocs, (docs) => {
	if (!docs) {
		document.documentElement.style.removeProperty("--ui-header-height");
	}
});

const links = computed(() =>
	appConfig.github && appConfig.github.url
		? [
				{
					icon: "i-simple-icons-github",
					to: appConfig.github.url,
					target: "_blank",
					"aria-label": "GitHub",
				},
			]
		: [],
);
</script>

<template>
	<UHeader
		:ui="{ center: 'flex-1', root: isDocs ? 'h-auto' : '', container: 'h-16' }"
		:to="localePath('/')"
		:title="appConfig.header?.title || site.name"
	>
		<AppHeaderCenter />

		<template #title>
			<AppHeaderLogo class="h-6 w-auto shrink-0" />
		</template>

		<template #right>
			<AppHeaderCTA class="max-sm:hidden" />

			<template v-if="isEnabled && locales.length > 1">
				<ClientOnly>
					<LanguageSelect />

					<template #fallback>
						<div
							class="h-8 w-8 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md"
						/>
					</template>
				</ClientOnly>

				<USeparator orientation="vertical" class="h-8" />
			</template>

			<UContentSearchButton class="lg:hidden" />

			<ClientOnly>
				<UColorModeButton />

				<template #fallback>
					<div
						class="h-8 w-8 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md"
					/>
				</template>
			</ClientOnly>

			<template v-if="links?.length">
				<UButton
					v-for="(link, index) of links"
					:key="index"
					v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
				/>
			</template>
		</template>

		<template #toggle="{ open, toggle }">
			<IconMenuToggle :open="open" class="lg:hidden" @click="toggle" />
		</template>

		<template #body>
			<AppHeaderBody />
		</template>

		<template v-if="isDocs" #bottom>
			<AppSubHeader />
		</template>
	</UHeader>
</template>
