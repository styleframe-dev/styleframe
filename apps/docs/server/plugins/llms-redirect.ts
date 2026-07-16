import type { H3Event } from "h3";
import { withoutTrailingSlash } from "ufo";

/**
 * Serve `/llms.txt` from the homepage for AI agents and crawlers.
 *
 * Human browsers still get the rendered homepage; only clients that ask for
 * markdown (`Accept: text/markdown`) or identify as `curl` are redirected to
 * the `nuxt-llms` entry point. This mirrors Docus's agent-friendly behaviour
 * but works across Nitro presets (we deploy the node-server output), where the
 * upstream Vercel-config rewrite does not apply.
 *
 * It runs on the `request` hook rather than as route middleware so it fires
 * before Nitro's public-asset handler serves the prerendered homepage — route
 * middleware would never see a request for a statically generated page.
 */
export default defineNitroPlugin((nitroApp) => {
	nitroApp.hooks.hook("request", (event) => {
		if (event.method !== "GET" && event.method !== "HEAD") {
			return;
		}

		const path = withoutTrailingSlash(event.path.split("?")[0]) || "/";
		if (!isRootPath(event, path)) {
			return;
		}

		const accept = getHeader(event, "accept") ?? "";
		const userAgent = getHeader(event, "user-agent") ?? "";

		const wantsMarkdown = accept.includes("text/markdown");
		const isCurl = /^curl\//i.test(userAgent);

		if (wantsMarkdown || isCurl) {
			return sendRedirect(event, "/llms.txt", 302);
		}
	});
});

/**
 * True for `/` and, when i18n is enabled, each locale homepage (e.g. `/en`).
 */
function isRootPath(event: H3Event, path: string) {
	if (path === "/") {
		return true;
	}

	const i18n = useRuntimeConfig(event).public.i18n as
		| { locales?: (string | { code: string })[] }
		| undefined;

	if (!i18n?.locales) {
		return false;
	}

	return i18n.locales.some((locale) => {
		const code = typeof locale === "string" ? locale : locale.code;
		return path === `/${code}`;
	});
}
