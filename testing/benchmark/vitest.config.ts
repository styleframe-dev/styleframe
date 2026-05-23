import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		passWithNoTests: true,
		exclude: ["tests/**", "node_modules/**"],
	},
});
