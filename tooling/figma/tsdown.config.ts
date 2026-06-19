import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	dts: true,
	clean: true,
	// tsdown 0.22+ defaults output to `.mjs`/`.d.mts`; keep `.js`/`.d.ts` so the
	// package.json `exports`/`types` paths resolve.
	fixedExtension: false,
});
