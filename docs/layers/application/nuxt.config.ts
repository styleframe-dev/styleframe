// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-22",
	modules: ["@nuxtjs/supabase"],
	supabase: {
		redirectOptions: {
			login: "/login",
			callback: "/confirm",
			include: ["/app/**"],
			saveRedirectToCookie: true,
		},
	},
});
