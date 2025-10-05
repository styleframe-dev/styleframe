import path from "node:path";
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
		const entryPath = path.resolve(args.entry);
		const cwd = path.dirname(entryPath);
		const name = path.basename(entryPath).replace(/(\.config)?(\.ts)?$/, "");

		consola.info(
			`Loading configuration from "${path.relative(process.cwd(), entryPath)}"...`,
		);

		const instance = await loadConfiguration({ cwd, name });

		consola.info("Building styleframe...");

		await build(instance, {
			outputDir: args.outputDir,
		});

		consola.success("Styleframe built successfully!");
	},
});
