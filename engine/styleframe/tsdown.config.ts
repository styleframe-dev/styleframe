import { defineConfig } from "tsdown";

export default defineConfig([
	{
		entry: ["./src/index.ts"],
		platform: "neutral",
		dts: true,
		format: ["esm", "cjs"],
	},
	{
		entry: ["./src/cli.ts"],
		platform: "node",
		dts: true,
		format: ["esm", "cjs"],
	},
	{
		entry: ["./src/loader.ts"],
		platform: "node",
		dts: true,
		format: ["esm", "cjs"],
	},
	{
		entry: ["./src/transpiler.ts"],
		platform: "neutral",
		dts: true,
		format: ["esm", "cjs"],
	},
	{
		entry: ["./src/plugin/*.ts"],
		outDir: "./dist/plugin",
		platform: "node",
		dts: true,
		format: ["esm", "cjs"],
	},
]);
