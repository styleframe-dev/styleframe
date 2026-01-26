import { createViteConfig } from "@styleframe/config-vite";
import { VitePluginNode } from "vite-plugin-node";

const __dirname = new URL(".", import.meta.url).pathname;

export default createViteConfig("index", __dirname, {
	plugins: [
		VitePluginNode({
			appPath: "./src/index.ts",
			adapter: "express",
		}),
	],
});
