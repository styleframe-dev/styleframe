import type { ConfigDefaults } from "posthog-js";
import posthog from "posthog-js";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
	if (import.meta.dev) {
		return;
	}

	const runtimeConfig = useRuntimeConfig();

	const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
		api_host: runtimeConfig.public.posthogHost,
		defaults: runtimeConfig.public.posthogDefaults as ConfigDefaults,
		person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
		loaded: (posthog) => {
			if (import.meta.env.MODE === "development") posthog.debug();
		},
	});

	return {
		provide: {
			posthog: () => posthogClient,
		},
	};
});
