import { createViteConfig } from "@styleframe/config-vite";

const __dirname = new URL(".", import.meta.url).pathname;

export default createViteConfig("index", __dirname, {
	build: {
		lib: {
			formats: ["es", "cjs"],
		},
		rollupOptions: {
			external: [
				"node:fs/promises",
				"@styleframe/core",
				"@styleframe/license",
				"fast-glob",
			],
		},
	},
});
