/// <reference types="c12" />

import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
	collections: {
		landing: defineCollection({
			type: "page",
			source: {
				include: "index.md",
			},
		}),
		docs: defineCollection({
			type: "page",
			source: {
				include: "**/*.{md,yml}",
				exclude: ["index.md"],
			},
			schema: z.object({
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
			}),
		}),
	},
});
