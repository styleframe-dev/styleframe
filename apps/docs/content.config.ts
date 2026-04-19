import type { DefinedCollection } from "@nuxt/content";
import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";
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

	return folders.map((folder) => ({
		include: `${pathPrefix}docs/${folder}/**/*.{md,yml}`,
		prefix: `${baseUrl}/${folder.replace(/^\d+\./, "")}`,
	}));
};

let collections: Record<string, DefinedCollection>;

if (locales && Array.isArray(locales)) {
	collections = {};
	for (const locale of locales) {
		const code = typeof locale === "string" ? locale : locale.code;

		collections[`landing_${code}`] = defineCollection(
			asSitemapCollection({
				type: "page",
				source: [{ include: `${code}/*.md` }],
			}),
		);

		for (const section of DOCS_SECTIONS) {
			collections[`docs_${section.key}_${code}`] = defineCollection(
				asSitemapCollection({
					type: "page",
					source: buildDocsSource(section, `${code}/`, `/${code}`),
					schema: createDocsSchema(),
				}),
			);
		}
	}
} else {
	collections = {
		landing: defineCollection(
			asSitemapCollection({
				type: "page",
				source: [{ include: "*.md" }],
			}),
		),
	};

	for (const section of DOCS_SECTIONS) {
		collections[`docs_${section.key}`] = defineCollection(
			asSitemapCollection({
				type: "page",
				source: buildDocsSource(section),
				schema: createDocsSchema(),
			}),
		);
	}
}

export default defineContentConfig({ collections });
