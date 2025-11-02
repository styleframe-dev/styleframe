import type { DefinedCollection } from "@nuxt/content";
import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { useNuxt } from "@nuxt/kit";
import { joinURL } from "ufo";

const { options } = useNuxt();
const cwd = joinURL(options.rootDir, "content");
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

		collections[`landing_${code}`] = defineCollection({
			type: "page",
			source: [{ include: `${code}/*.md` }],
		});

		collections[`docs_${code}`] = defineCollection({
			type: "page",
			source: {
				include: `${code}/**/*.{md,yml}`,
				prefix: `/${code}`,
				exclude: [`${code}/*.md`],
			},
			schema: createDocsSchema(),
		});
	}
} else {
	collections = {
		landing: defineCollection({
			type: "page",
			source: [{ include: "*.md" }],
		}),
		docs: defineCollection({
			type: "page",
			source: {
				include: "**/*.{md,yml}",
				exclude: ["*.md"],
			},
			schema: createDocsSchema(),
		}),
	};
}

export default defineContentConfig({ collections });
