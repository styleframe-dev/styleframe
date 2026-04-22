import { withLeadingSlash } from "ufo";
import { stringify } from "minimark/stringify";
import { queryCollection } from "@nuxt/content/nitro";
import type { Collections } from "@nuxt/content";
import { DOCS_SECTIONS } from "~/constants/sections";

export default eventHandler(async (event) => {
	const slug = getRouterParams(event)["slug.md"];
	if (!slug?.endsWith(".md")) {
		throw createError({
			statusCode: 404,
			statusMessage: "Page not found",
			fatal: true,
		});
	}

	const path = withLeadingSlash(slug.replace(".md", ""));
	const config = useRuntimeConfig(event).public;

	const pathSegments = path.split("/").filter(Boolean);
	let localeSegment: string | undefined;
	let sectionIndex = 1; // expect /docs/<section>/...

	if (config.i18n?.locales) {
		const availableLocales = config.i18n.locales.map(
			(locale: string | { code: string }) =>
				typeof locale === "string" ? locale : locale.code,
		);
		const firstSegment = pathSegments[0];
		if (firstSegment && availableLocales.includes(firstSegment)) {
			localeSegment = firstSegment;
			sectionIndex = 2;
		} else if (config.i18n.defaultLocale) {
			localeSegment = config.i18n.defaultLocale;
		}
	}

	const sectionSlug = pathSegments[sectionIndex];
	const section = DOCS_SECTIONS.find((s) => s.slug === sectionSlug);
	if (!section) {
		throw createError({
			statusCode: 404,
			statusMessage: "Page not found",
			fatal: true,
		});
	}

	const collectionName = localeSegment
		? `docs_${section.key}_${localeSegment}`
		: `docs_${section.key}`;

	const page = await queryCollection(event, collectionName as keyof Collections)
		.path(path)
		.first();
	if (!page) {
		throw createError({
			statusCode: 404,
			statusMessage: "Page not found",
			fatal: true,
		});
	}

	// Add title and description to the top of the page if missing
	if (page.body.value[0]?.[0] !== "h1") {
		page.body.value.unshift(["blockquote", {}, page.description]);
		page.body.value.unshift(["h1", {}, page.title]);
	}

	setHeader(event, "Content-Type", "text/markdown; charset=utf-8");
	return stringify(
		{ ...page.body, type: "minimark" },
		{ format: "markdown/html" },
	);
});
