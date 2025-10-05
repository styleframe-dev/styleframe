import { build, loadConfiguration } from "@styleframe/loader";
import { defineCommand } from "citty";
import consola from "consola";

export default defineCommand({
	meta: {
		name: "build",
		description: "Build Styleframe project from source files",
	},
	args: {
		entry: {
			type: "positional",
			description: "Entry point file(s) for the build",
			default: "styleframe.config.ts",
			valueHint: "path",
		},
		outputDir: {
			type: "string",
			description: "Output directory for built files",
			default: "styleframe",
			alias: ["o", "out"],
			valueHint: "path",
		},
	},
	async run({ args }) {
		consola.info("Building styleframe...");

		const config = await loadConfiguration({ cwd: process.cwd() });

		await build(config, {
			outputDir: args.outputDir,
		});

		consola.success("Styleframe built successfully!");
	},
});
