<script setup lang="ts">
import type { NuxtError } from "#app";
import type { PageCollections } from "@nuxt/content";
import * as nuxtUiLocales from "@nuxt/ui/locale";

const props = defineProps<{
	error: NuxtError;
}>();

const { locale, locales, isEnabled, t, switchLocalePath } = useAppI18n();

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
	<UApp>
		<AppHeader />

		<UError :error="localizedError" />

		<AppFooter />
	</UApp>
</template>
