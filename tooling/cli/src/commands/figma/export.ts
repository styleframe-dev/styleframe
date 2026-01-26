import path from "node:path";
import { writeFile } from "node:fs/promises";
import { loadConfiguration } from "@styleframe/loader";
import { defineCommand } from "citty";
import consola from "consola";
import type {
	Variable,
	Theme,
	Root,
	TokenValue,
	Reference,
} from "@styleframe/core";
import {
	styleframeToFigmaName,
	cssColorToFigma,
	detectFigmaType,
	styleframeValueToFigma,
	toDTCG,
	type FigmaExportFormat,
	type FigmaExportVariable,
	type FigmaVariableType,
} from "@styleframe/figma";

export default defineCommand({
	meta: {
		name: "export",
		description: "Export Styleframe variables to DTCG format JSON",
	},
	args: {
		config: {
			type: "string",
			description: "Path to the Styleframe config file",
			default: "styleframe.config.ts",
			alias: ["c"],
			valueHint: "path",
		},
		output: {
			type: "string",
			description: "Output JSON file path",
			default: "tokens.json",
			alias: ["o"],
			valueHint: "path",
		},
		collection: {
			type: "string",
			description: "Name for the Figma collection",
			default: "Design Tokens",
			alias: ["n", "name"],
		},
		baseFontSize: {
			type: "string",
			description: "Base font size for rem conversion (in pixels)",
			default: "16",
		},
	},
	async run({ args }) {
		const configPath = path.resolve(args.config);
		const outputPath = path.resolve(args.output);
		const baseFontSize = Number.parseInt(args.baseFontSize, 10) || 16;

		consola.info(
			`Loading configuration from "${path.relative(process.cwd(), configPath)}"...`,
		);

		const instance = await loadConfiguration({ entry: configPath });
		const root = instance.root as Root;

		consola.info("Extracting variables...");

		// Collect modes from themes
		const modes = ["Default", ...root.themes.map((t) => capitalize(t.name))];

		// Build a map of variable values by mode
		const variableMap = new Map<string, Map<string, unknown>>();

		// Process root variables (default mode)
		for (const variable of root.variables) {
			if (!variableMap.has(variable.name)) {
				variableMap.set(variable.name, new Map());
			}
			const modeValues = variableMap.get(variable.name)!;
			modeValues.set("Default", resolveValue(variable.value));
		}

		// Process theme variables (theme modes)
		for (const theme of root.themes) {
			const modeName = capitalize(theme.name);
			for (const variable of theme.variables) {
				if (!variableMap.has(variable.name)) {
					variableMap.set(variable.name, new Map());
				}
				const modeValues = variableMap.get(variable.name)!;
				modeValues.set(modeName, resolveValue(variable.value));
			}
		}

		// Convert to Figma format
		const variables: FigmaExportVariable[] = [];

		for (const [name, modeValues] of variableMap) {
			const defaultValue = modeValues.get("Default");
			if (defaultValue === undefined) continue;

			const type = detectFigmaType(defaultValue) as FigmaVariableType;
			const figmaValues: Record<string, unknown> = {};

			for (const [modeName, value] of modeValues) {
				const figmaValue = styleframeValueToFigma(value, type, baseFontSize);
				if (figmaValue !== null) {
					figmaValues[modeName] = figmaValue;
				}
			}

			// Check if this is a reference
			const rawDefaultValue = getRawValue(
				root.variables.find((v) => v.name === name)?.value,
			);
			const isReference = isReferenceValue(rawDefaultValue);
			const aliasTo = isReference
				? getReferenceName(rawDefaultValue)
				: undefined;

			variables.push({
				name: styleframeToFigmaName(name),
				styleframeName: name,
				type,
				values: figmaValues as FigmaExportVariable["values"],
				aliasTo,
			});
		}

		const intermediateData: FigmaExportFormat = {
			collection: args.collection,
			modes,
			variables,
		};

		// Convert to DTCG format
		const dtcgData = toDTCG(intermediateData);

		consola.info(
			`Writing ${variables.length} variables to "${path.relative(process.cwd(), outputPath)}"...`,
		);

		await writeFile(outputPath, JSON.stringify(dtcgData, null, 2));

		consola.success(
			`Exported ${variables.length} variables in DTCG format to "${path.relative(process.cwd(), outputPath)}"`,
		);
	},
});

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function resolveValue(value: TokenValue): unknown {
	if (value === null || value === undefined) return value;
	if (typeof value !== "object") return value;

	if ("type" in value) {
		if (value.type === "reference") {
			// For references, we'll note them but still try to get a resolved value
			return value.fallback ?? "";
		}
		if (value.type === "css") {
			// CSS template literal - join the parts
			return (value.value as TokenValue[]).map((v) => resolveValue(v)).join("");
		}
	}

	if (Array.isArray(value)) {
		return value.map((v) => resolveValue(v)).join("");
	}

	return String(value);
}

function getRawValue(value: TokenValue | undefined): TokenValue {
	return value ?? "";
}

function isReferenceValue(value: TokenValue): value is Reference {
	return (
		typeof value === "object" &&
		value !== null &&
		"type" in value &&
		value.type === "reference"
	);
}

function getReferenceName(value: Reference): string {
	return value.name;
}
