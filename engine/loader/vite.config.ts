import { createViteConfig } from "@styleframe/config-vite";

const __dirname = new URL(".", import.meta.url).pathname;

export default createViteConfig("loader", __dirname, {
	build: {
		lib: {
			fileName: "index",
			formats: ["es", "cjs"],
		},
		rollupOptions: {
			external: [
				"node:fs",
				"node:fs/promises",
				"node:path",
				"@styleframe/core",
				"@styleframe/transpiler",
				"@styleframe/license",
				"chokidar",
				"jiti",
			],
		},
	},
});
