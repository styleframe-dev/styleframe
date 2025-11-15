export default defineNuxtPlugin(() => {
	const nuxtApp = useNuxtApp();

	const i18nConfig = nuxtApp.$config.public.i18n;
	if (!i18nConfig) {
		return;
	}

	addRouteMiddleware((to) => {
		if (to.path === "/") {
			const cookieLocale =
				useCookie("i18n_redirected").value || i18nConfig.defaultLocale || "en";

			return navigateTo(`/${cookieLocale}`);
		}
	});
});
