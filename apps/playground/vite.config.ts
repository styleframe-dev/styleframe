import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import styleframe from "@styleframe/plugin/vite";
import { defineConfig, type Plugin } from "vite";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

const require = createRequire(import.meta.url);

function resolveVueEsm(): string {
	return require.resolve("vue/dist/vue.esm-browser.js");
}

function resolveRuntimeEsm(): string {
	const entry = require.resolve("@styleframe/runtime");
	return path.resolve(path.dirname(entry), "runtime.js");
}

function vendorModules(): Plugin {
	const vendorPaths: Record<string, string> = {
		"virtual:pg-vue-url": resolveVueEsm(),
		"virtual:pg-runtime-url": resolveRuntimeEsm(),
	};

	const emittedFileNames: Record<string, string> = {
		"virtual:pg-vue-url": "vue.esm-browser.js",
		"virtual:pg-runtime-url": "styleframe-runtime.esm.js",
	};

	let isBuild = false;

	return {
		name: "pg-vendor-modules",
		enforce: "pre",
		config(_, env) {
			isBuild = env.command === "build";
		},
		resolveId(id) {
			if (id in vendorPaths) return id;
			return null;
		},
		async load(id) {
			if (!(id in vendorPaths)) return null;
			const absolute = vendorPaths[id]!;
			if (!isBuild) {
				return `export default ${JSON.stringify(`/@fs${absolute}`)};`;
			}
			const fs = await import("node:fs/promises");
			const source = await fs.readFile(absolute, "utf8");
			const name = emittedFileNames[id]!;
			const referenceId = this.emitFile({
				type: "asset",
				fileName: `vendor/${name}`,
				source,
			});
			return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`;
		},
	};
}

export default defineConfig({
	plugins: [
		vendorModules(),
		styleframe({
			scanner: {
				content: ["./src/**/*.{vue,ts,tsx}", "./index.html"],
			},
			resolve: {
				alias: {
					"@/*": path.resolve(dirname, "./src/*"),
					"@styleframe/theme": "../../theme/src/index.ts",
				},
			},
		}),
		vue(),
	],
	resolve: {
		alias: [
			{ find: /^@\//, replacement: `${path.resolve(dirname, "./src")}/` },
			{
				find: "@styleframe/theme",
				replacement: path.resolve(dirname, "../../theme/src/index.ts"),
			},
		],
	},
	optimizeDeps: {
		exclude: ["esbuild-wasm"],
	},
	server: {
		fs: {
			allow: [path.resolve(dirname, "../.."), dirname],
		},
	},
	test: {
		include: ["test/**/*.test.ts"],
	},
});
