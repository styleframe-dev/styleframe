<script setup lang="ts">
import * as nuxtUiLocales from "@nuxt/ui/locale";

const { seo } = useAppConfig();
const site = useSiteConfig();
const { locale, locales, isEnabled, switchLocalePath } = useAppI18n();

const lang = computed(
	() => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales]?.code || "en",
);
const dir = computed(
	() => nuxtUiLocales[locale.value as keyof typeof nuxtUiLocales]?.dir || "ltr",
);

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
</script>

<template>
	<UApp :locale="nuxtUiLocales[locale as keyof typeof nuxtUiLocales]">
		<NuxtLoadingIndicator color="var(--ui-primary)" />

		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>
