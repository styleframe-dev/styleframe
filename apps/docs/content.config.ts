import type { DefinedCollection } from "@nuxt/content";
import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";
import { useNuxt } from "@nuxt/kit";
import { DOCS_SECTIONS } from "./app/utils/docsSections";

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
					source: {
						include: `${code}/docs/${section.folder}/**/*.{md,yml}`,
						prefix: `/${code}/docs/${section.slug}`,
					},
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
				source: {
					include: `docs/${section.folder}/**/*.{md,yml}`,
					prefix: `/docs/${section.slug}`,
				},
				schema: createDocsSchema(),
			}),
		);
	}
}

export default defineContentConfig({ collections });
