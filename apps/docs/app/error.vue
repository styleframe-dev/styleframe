<script setup lang="ts">
import type { NuxtError } from "#app";
import type { ContentNavigationItem, PageCollections } from "@nuxt/content";
import * as nuxtUiLocales from "@nuxt/ui/locale";
import { flattenNavigation } from "~/utils/flattenNavigation";
import { foldNonRouteCategories } from "~/utils/foldNonRouteCategories";

const props = defineProps<{
	error: NuxtError;
}>();

const { locale, locales, isEnabled, t, switchLocalePath } = useDocusI18n();
const appConfig = useAppConfig();

const lang = computed(
	() => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales]?.code || "en",
);
const dir = computed(
	() => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales]?.dir || "ltr",
);
useHead({
	htmlAttrs: {
		lang,
		dir,
	},
});

const localizedError = computed(() => {
	return {
		...props.error,
		statusMessage: t("common.error.title"),
	};
});

useSeoMeta({
	title: () => t("common.error.title"),
	description: () => t("common.error.description"),
});

if (isEnabled.value) {
	const route = useRoute();
	const defaultLocale = (
		useRuntimeConfig().public.i18n as { defaultLocale: string }
	).defaultLocale;
	onMounted(() => {
		const currentLocale = route.path.split("/")[1];
		if (!locales.some((locale) => locale.code === currentLocale)) {
			return navigateTo(switchLocalePath(defaultLocale) as string);
		}
	});
}

const getCollectionName = (key: string) =>
	(isEnabled.value
		? `docs_${key}_${locale.value}`
		: `docs_${key}`) as keyof PageCollections;

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
					const rootIdx =
						"rootFolder" in section ? (section.rootFolder as number) : -1;
					const rootWrapper =
						localeResult.length === 1 && localeResult[0]?.path === sectionPath
							? localeResult[0]
							: null;
					const allItems = rootWrapper
						? (rootWrapper.children ?? [])
						: localeResult;

					if (rootIdx >= 0) {
						const nonRootPaths = new Set(
							section.folder
								.filter((_, i) => i !== rootIdx)
								.map((f) => `${sectionPath}/${f.replace(/^\d+\./, "")}`),
						);
						const items: ContentNavigationItem[] = [];
						for (let i = 0; i < section.folder.length; i++) {
							if (i === rootIdx) {
								items.push({
									...(rootWrapper ?? {}),
									title: rootWrapper?.title ?? section.label,
									path: sectionPath,
									children: allItems.filter(
										(item) => !nonRootPaths.has(item.path),
									),
								} as ContentNavigationItem);
							} else {
								const found = allItems.find(
									(item) =>
										item.path ===
										`${sectionPath}/${section.folder[i]?.replace(/^\d+\./, "")}`,
								);
								if (found) items.push(found);
							}
						}
						result = items;
					} else {
						result = section.folder
							.map((folder) =>
								allItems.find(
									(item) =>
										item.path ===
										`${sectionPath}/${folder.replace(/^\d+\./, "")}`,
								),
							)
							.filter(
								(item): item is ContentNavigationItem => item !== undefined,
							);
					}
				} else {
					result = localeResult;
				}
				return [
					section.key,
					foldNonRouteCategories(
						flattenNavigation(result),
						appConfig.nonRouteCategories ?? {},
					),
				] as const;
			}),
		);
		return Object.fromEntries(results) as Record<
			string,
			ContentNavigationItem[]
		>;
	},
	{ watch: [locale] },
);

const flatNavigation = computed(() =>
	navigation.value ? Object.values(navigation.value).flat() : [],
);

provide("navigation", navigation);
</script>

<template>
	<UApp>
		<AppHeader />

		<UError :error="localizedError" />

		<AppFooter />

		<ClientOnly>
			<AppSearch :navigation="flatNavigation" />
		</ClientOnly>
	</UApp>
</template>
