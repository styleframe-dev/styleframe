import styleframe from "styleframe/plugin/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		vue(),
		styleframe({
			content: ["./src/**/*.{vue,ts,tsx}", "./index.html"],
		}),
	],
});
