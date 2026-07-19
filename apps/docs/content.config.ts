import type { DefinedCollection } from "@nuxt/content";
import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { defineSitemapSchema } from "@nuxtjs/sitemap/content";
import { useNuxt } from "@nuxt/kit";
import { DOCS_SECTIONS, type DocsSection } from "./app/constants/sections";

const { options } = useNuxt();
const locales = options.i18n?.locales;

const createDocsSchema = () =>
	z.object({
		links: z
			.array(
				z.object({
					label: z.string(),
					icon: z.string(),
					to: z.string(),
					target: z.string().optional(),
				}),
			)
			.optional(),
	});

const buildDocsSource = (
	section: DocsSection,
	pathPrefix = "",
	urlPrefix = "",
) => {
	const folders = Array.isArray(section.folder)
		? section.folder
		: [section.folder];
	const baseUrl = `${urlPrefix}/docs/${section.slug}`;

	if (folders.length === 1) {
		return {
			include: `${pathPrefix}docs/${folders[0]}/**/*.{md,yml}`,
			prefix: baseUrl,
		};
	}

	const rootIndex =
		"rootFolder" in section ? (section.rootFolder as number) : -1;

	return folders.map((folder, index) => ({
		include: `${pathPrefix}docs/${folder}/**/*.{md,yml}`,
		prefix:
			index === rootIndex
				? baseUrl
				: `${baseUrl}/${folder.replace(/^\d+\./, "")}`,
	}));
};

let collections: Record<string, DefinedCollection>;

if (locales && Array.isArray(locales)) {
	collections = {};
	for (const locale of locales) {
		const code = typeof locale === "string" ? locale : locale.code;

		collections[`landing_${code}`] = defineCollection({
			type: "page",
			source: [{ include: `${code}/*.md` }],
			schema: z.object({
				sitemap: defineSitemapSchema(),
			}),
		});

		for (const section of DOCS_SECTIONS) {
			collections[`docs_${section.key}_${code}`] = defineCollection({
				type: "page",
				source: buildDocsSource(section, `${code}/`, `/${code}`),
				schema: createDocsSchema().extend({
					sitemap: defineSitemapSchema(),
				}),
			});
		}
	}
} else {
	collections = {
		landing: defineCollection({
			type: "page",
			source: [{ include: "*.md" }],
			schema: z.object({
				sitemap: defineSitemapSchema(),
			}),
		}),
	};

	for (const section of DOCS_SECTIONS) {
		collections[`docs_${section.key}`] = defineCollection({
			type: "page",
			source: buildDocsSource(section),
			schema: createDocsSchema().extend({
				sitemap: defineSitemapSchema(),
			}),
		});
	}
}

// The changelog is a single, locale-independent collection. Each entry is one
// released version. The `/changelog` index queries it directly and renders every
// body inline; each entry also has a deep-linkable detail route at
// `/changelog/<version>` (app/pages/[[lang]]/changelog/[slug].vue). Both read
// from this same collection — no content duplication — and both are prerendered.
collections.changelog = defineCollection({
	type: "page",
	source: { include: "changelog/*.md" },
	schema: z.object({
		version: z.string(),
		date: z.string(),
	}),
});

export default defineContentConfig({ collections });
