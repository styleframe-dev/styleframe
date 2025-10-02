import consola from "consola";
import { defineCommand } from "citty";

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

		outDir: {
			type: "string",
			description: "Output directory for built files",
			default: "dist",
			alias: ["o", "out"],
			valueHint: "path",
		},
	},
	async run({ args }) {},
});
