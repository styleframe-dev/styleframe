import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { defineCommand } from "citty";
import consola from "consola";
import {
	generateStyleframeCode,
	type FigmaExportFormat,
} from "@styleframe/figma";

export default defineCommand({
	meta: {
		name: "import",
		description: "Generate Styleframe code from Figma-exported JSON",
	},
	args: {
		input: {
			type: "string",
			description: "Input JSON file path (exported from Figma plugin)",
			required: true,
			alias: ["i"],
			valueHint: "path",
		},
		output: {
			type: "string",
			description: "Output Styleframe TypeScript file path",
			default: "tokens.styleframe.ts",
			alias: ["o"],
			valueHint: "path",
		},
		composables: {
			type: "boolean",
			description:
				"Use @styleframe/theme composables (useColor, useSpacing, etc.)",
			default: true,
		},
		rem: {
			type: "boolean",
			description: "Use rem units for dimensions instead of px",
			default: false,
		},
		baseFontSize: {
			type: "string",
			description: "Base font size for rem conversion (in pixels)",
			default: "16",
		},
		instanceName: {
			type: "string",
			description: "Name for the Styleframe instance variable",
			default: "s",
		},
	},
	async run({ args }) {
		const inputPath = path.resolve(args.input);
		const outputPath = path.resolve(args.output);
		const baseFontSize = Number.parseInt(args.baseFontSize, 10) || 16;

		consola.info(
			`Reading JSON from "${path.relative(process.cwd(), inputPath)}"...`,
		);

		let data: FigmaExportFormat;
		try {
			const content = await readFile(inputPath, "utf-8");
			data = JSON.parse(content) as FigmaExportFormat;
		} catch (error) {
			consola.error(
				`Failed to read or parse input file: ${error instanceof Error ? error.message : error}`,
			);
			process.exit(1);
		}

		// Validate the input format
		if (
			!data.collection ||
			!Array.isArray(data.modes) ||
			!Array.isArray(data.variables)
		) {
			consola.error(
				"Invalid input format. Expected { collection, modes, variables }.",
			);
			process.exit(1);
		}

		consola.info(
			`Generating Styleframe code for ${data.variables.length} variables...`,
		);

		const result = generateStyleframeCode(data, {
			useComposables: args.composables,
			useRem: args.rem,
			baseFontSize,
			instanceName: args.instanceName,
		});

		consola.info(`Writing to "${path.relative(process.cwd(), outputPath)}"...`);

		await writeFile(outputPath, result.code);

		consola.success(`Generated Styleframe code with:`);
		consola.info(`  - ${result.variables.length} variables`);
		consola.info(`  - ${result.themes.length} theme(s)`);
		if (args.composables && result.imports.length > 1) {
			consola.info(
				`  - Using composables: ${result.imports.slice(1).join(", ")}`,
			);
		}
		consola.info(`\nOutput: ${path.relative(process.cwd(), outputPath)}`);
	},
});
