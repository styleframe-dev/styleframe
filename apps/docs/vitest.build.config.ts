import { defineConfig } from "vitest/config";

// Compiled-output guards. Separate from the default `pnpm test` run because they
// require a prior `nuxt build`; invoked via `test:build` in the docs build job.
export default defineConfig({
	test: {
		include: ["test/**/*.build.test.ts"],
	},
});
