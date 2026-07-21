import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["test/**/*.test.ts"],
		// Compiled-output guards require a prior `nuxt build`; they run via the
		// `test:build` script (see vitest.build.config.ts), not the default run.
		exclude: [...configDefaults.exclude, "test/**/*.build.test.ts"],
	},
});
