import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import Styleframe from "../src/vite";

export default defineConfig({
	plugins: [
		Inspect(),
		Styleframe({
			content: ["index.html"],
		}),
	],
});
