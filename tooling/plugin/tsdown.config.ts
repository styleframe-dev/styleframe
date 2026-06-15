import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/*.ts"],
	// tsdown 0.22+ defaults output to `.mjs`/`.d.mts`; keep `.js`/`.d.ts` so the
	// package.json `exports`/`types` paths resolve.
	fixedExtension: false,
});
