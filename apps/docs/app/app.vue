<script setup lang="ts">
import type { ContentNavigationItem, PageCollections } from "@nuxt/content";
import * as nuxtUiLocales from "@nuxt/ui/locale";
import { flattenNavigation } from "~/utils/flattenNavigation";

const { seo } = useAppConfig();
const site = useSiteConfig();
const { locale, locales, isEnabled, switchLocalePath } = useDocusI18n();

const lang = computed(
	() => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales]?.code || "en",
);
const dir = computed(
	() => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales]?.dir || "ltr",
);

const getCollectionName = (key: string) =>
	(isEnabled.value
		? `docs_${key}_${locale.value}`
		: `docs_${key}`) as keyof PageCollections;

useHead({
	meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
	link: [{ rel: "icon", href: "/favicon.ico" }],
	htmlAttrs: {
		lang,
		dir,
	},
});

useSeoMeta({
	titleTemplate: seo.titleTemplate,
	title: seo.title,
	description: seo.description,
	ogSiteName: site.name,
	twitterCard: "summary_large_image",
});

if (isEnabled.value) {
	const route = useRoute();
	const defaultLocale = useRuntimeConfig().public.i18n.defaultLocale!;
	onMounted(() => {
		const currentLocale = route.path.split("/")[1];
		if (!locales.some((locale) => locale.code === currentLocale)) {
			return navigateTo(switchLocalePath(defaultLocale) as string);
		}
	});
}

const { data: navigation } = await useAsyncData(
	() => `navigation_${locale.value}`,
	async () => {
		const results = await Promise.all(
			DOCS_SECTIONS.map(async (section) => {
				const collectionName = getCollectionName(section.key);
				const data = await queryCollectionNavigation(collectionName);
				const rootResult =
					data.find((item) => item.path === `/docs/${section.slug}`)
						?.children ||
					data.find((item) => item.path === "/docs")?.children ||
					data ||
					[];
				const localeResult =
					rootResult.find((item) => item.path === `/${locale.value}`)
						?.children || rootResult;
				const sectionPath = `/docs/${section.slug}`;
				let result: ContentNavigationItem[];
				if (Array.isArray(section.folder)) {
					const unwrapped =
						localeResult.length === 1 && localeResult[0].path === sectionPath
							? (localeResult[0].children ?? [])
							: localeResult;
					result = section.folder
						.map((folder) =>
							unwrapped.find(
								(item) =>
									item.path ===
									`${sectionPath}/${folder.replace(/^\d+\./, "")}`,
							),
						)
						.filter((item): item is ContentNavigationItem => item !== undefined);
				} else {
					result = localeResult;
				}
				return [section.key, flattenNavigation(result)] as const;
			}),
		);
		return Object.fromEntries(results) as Record<
			string,
			ContentNavigationItem[]
		>;
	},
	{
		watch: [locale],
	},
);

const { data: files } = useLazyAsyncData(
	`search_${locale.value}`,
	async () => {
		const perSection = await Promise.all(
			DOCS_SECTIONS.map((section) =>
				queryCollectionSearchSections(getCollectionName(section.key)),
			),
		);
		return perSection.flat();
	},
	{
		server: false,
		watch: [locale],
	},
);

const flatNavigation = computed(() =>
	navigation.value ? Object.values(navigation.value).flat() : [],
);

provide("navigation", navigation);
</script>

<template>
	<UApp :locale="nuxtUiLocales[locale as keyof typeof nuxtUiLocales]">
		<NuxtLoadingIndicator color="var(--ui-primary)" />

		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>

		<ClientOnly>
			<LazyUContentSearch :files="files" :navigation="flatNavigation" />
		</ClientOnly>
	</UApp>
</template>
