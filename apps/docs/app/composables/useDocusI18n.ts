import type { LocaleObject } from "@nuxtjs/i18n";
import type { Ref } from "vue";
import en from "../../i18n/locales/en.json";

/**
 * `@nuxtjs/i18n` auto-imports. This app ships with i18n disabled — the module is
 * not registered (see apps/shared/modules/config.ts) — so the enabled branch
 * below is inert. These declarations let the file typecheck without the module
 * generating the globals; when i18n is enabled the real composables are used.
 */
declare function useI18n(): { locale: Ref<string>; t: (key: string) => string };
declare function useLocalePath(): (route: string, locale?: string) => string;
declare function useSwitchLocalePath(): (locale: string) => string;

export const useDocusI18n = () => {
	const config = useRuntimeConfig().public;
	const isEnabled = ref(!!config.i18n);

	if (!isEnabled.value) {
		return {
			isEnabled,
			locale: ref("en"),
			locales: [],
			localePath: (path: string) => path,
			switchLocalePath: (_locale?: string): string => "",
			t: (key: string): string => {
				const path = key.split(".");
				return path.reduce(
					(acc: unknown, curr) => (acc as Record<string, unknown>)?.[curr],
					en,
				) as string;
			},
		};
	}

	const { locale, t } = useI18n();
	const filteredLocales =
		(config.docus as { filteredLocales: LocaleObject<string>[] })
			?.filteredLocales || [];

	return {
		isEnabled,
		locale,
		locales: filteredLocales,
		t,
		localePath: useLocalePath(),
		switchLocalePath: useSwitchLocalePath(),
	};
};
