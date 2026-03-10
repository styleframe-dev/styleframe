import path from "node:path";
import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import Styleframe from "../src/vite";

export default defineConfig({
	plugins: [
		Inspect(),
		Styleframe({
			content: ["index.html"],
			resolve: {
				alias: {
					"@styleframe/theme": "../../../theme/src/index.ts",
				},
			},
		}),
	],
	resolve: {
		alias: {
			"@styleframe/theme": path.resolve(
				__dirname,
				"../../../theme/src/index.ts",
			),
		},
	},
});
