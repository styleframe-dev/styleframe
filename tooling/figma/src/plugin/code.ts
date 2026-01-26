/// <reference types="@figma/plugin-typings" />

import type {
	FigmaExportFormat,
	FigmaExportVariable,
	FigmaRGBA,
} from "../types";
import type { DTCGDocument } from "../converters/dtcg/types";
import {
	figmaToStyleframeName,
	styleframeToFigmaName,
} from "../converters/name-mapping";
import { fromDTCG } from "../converters/dtcg/from-dtcg";
import { toDTCG } from "../converters/dtcg/to-dtcg";
import { isDTCGFormat } from "./shared";

/**
 * Message types for plugin <-> UI communication
 */
interface ImportMessage {
	type: "import";
	data: FigmaExportFormat | DTCGDocument;
}

interface ExportMessage {
	type: "export";
	collectionId?: string;
}

interface GetCollectionsMessage {
	type: "get-collections";
}

interface CloseMessage {
	type: "close";
}

type PluginMessage =
	| ImportMessage
	| ExportMessage
	| GetCollectionsMessage
	| CloseMessage;

/**
 * Show the plugin UI
 */
figma.showUI(__html__, {
	width: 520,
	height: 640,
	themeColors: true,
});

/**
 * Handle the initial command
 */
figma.on("run", ({ command }) => {
	figma.ui.postMessage({ type: "set-mode", mode: command });
});

/**
 * Handle messages from the UI
 */
figma.ui.onmessage = async (msg: PluginMessage) => {
	try {
		switch (msg.type) {
			case "import":
				await handleImport(msg.data);
				break;
			case "export":
				await handleExport(msg.collectionId);
				break;
			case "get-collections":
				await sendCollections();
				break;
			case "close":
				figma.closePlugin();
				break;
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		figma.ui.postMessage({ type: "error", message: errorMessage });
	}
};

/**
 * Send available collections to the UI
 */
async function sendCollections(): Promise<void> {
	const collections = await figma.variables.getLocalVariableCollectionsAsync();
	const collectionData = collections.map((c) => ({
		id: c.id,
		name: c.name,
		modes: c.modes.map((m) => ({ id: m.modeId, name: m.name })),
		variableCount: c.variableIds.length,
	}));

	figma.ui.postMessage({ type: "collections", collections: collectionData });
}

/**
 * Import variables from JSON data (supports both DTCG and legacy formats)
 */
async function handleImport(
	rawData: FigmaExportFormat | DTCGDocument,
): Promise<void> {
	// Convert DTCG format to internal format if needed
	const data: FigmaExportFormat = isDTCGFormat(rawData)
		? fromDTCG(rawData)
		: (rawData as FigmaExportFormat);

	const { collection: collectionName, modes, variables } = data;

	// Create or get the collection
	const existingCollections =
		await figma.variables.getLocalVariableCollectionsAsync();
	let collection = existingCollections.find((c) => c.name === collectionName);

	if (!collection) {
		collection = figma.variables.createVariableCollection(collectionName);
	}

	// Setup modes
	const modeIdMap = new Map<string, string>();
	const existingModes = collection.modes;

	// Map first mode to default or rename
	if (modes.length > 0) {
		const defaultMode = existingModes[0];
		if (defaultMode) {
			collection.renameMode(defaultMode.modeId, modes[0] ?? "Default");
			modeIdMap.set(modes[0] ?? "Default", defaultMode.modeId);
		}
	}

	// Add additional modes
	for (let i = 1; i < modes.length; i++) {
		const modeName = modes[i];
		if (!modeName) continue;

		const existingMode = existingModes.find((m) => m.name === modeName);
		if (existingMode) {
			modeIdMap.set(modeName, existingMode.modeId);
		} else {
			const newModeId = collection.addMode(modeName);
			modeIdMap.set(modeName, newModeId);
		}
	}

	// Create a map to track created variables for alias resolution
	const variableMap = new Map<string, Variable>();

	// Get existing variables once
	const existingVariables = await figma.variables.getLocalVariablesAsync();

	// First pass: create all non-alias variables
	for (const v of variables) {
		if (v.aliasTo) continue; // Skip aliases for now

		const existing = existingVariables.find(
			(fv) => fv.name === v.name && fv.variableCollectionId === collection.id,
		);

		let figmaVar: Variable;
		if (existing) {
			figmaVar = existing;
		} else {
			figmaVar = figma.variables.createVariable(
				v.name,
				collection,
				getResolvedType(v.type),
			);
		}

		// Set values for each mode
		for (const [modeName, value] of Object.entries(v.values)) {
			const modeId = modeIdMap.get(modeName);
			if (!modeId) continue;

			const figmaValue = convertToFigmaValue(value, v.type);
			if (figmaValue !== null) {
				figmaVar.setValueForMode(modeId, figmaValue);
			}
		}

		variableMap.set(v.name, figmaVar);
	}

	// Second pass: create alias variables
	for (const v of variables) {
		if (!v.aliasTo) continue;

		const targetVar = variableMap.get(styleframeToFigmaName(v.aliasTo));
		if (!targetVar) {
			console.warn(`Alias target not found: ${v.aliasTo}`);
			continue;
		}

		const existing = existingVariables.find(
			(fv) => fv.name === v.name && fv.variableCollectionId === collection.id,
		);

		let figmaVar: Variable;
		if (existing) {
			figmaVar = existing;
		} else {
			figmaVar = figma.variables.createVariable(
				v.name,
				collection,
				targetVar.resolvedType,
			);
		}

		// Set alias for default mode
		const defaultModeId = modeIdMap.get(modes[0] ?? "Default");
		if (defaultModeId) {
			figmaVar.setValueForMode(defaultModeId, {
				type: "VARIABLE_ALIAS",
				id: targetVar.id,
			});
		}
	}

	figma.ui.postMessage({
		type: "import-complete",
		result: {
			collection: collectionName,
			variablesCreated: variables.length,
		},
	});

	figma.notify(`Imported ${variables.length} variables to "${collectionName}"`);
}

/**
 * Export variables to JSON format
 */
async function handleExport(collectionId?: string): Promise<void> {
	const collections = await figma.variables.getLocalVariableCollectionsAsync();
	let collection: VariableCollection | undefined;

	if (collectionId) {
		collection = collections.find((c) => c.id === collectionId);
	} else {
		collection = collections[0];
	}

	if (!collection) {
		throw new Error("No variable collection found");
	}

	const modes = collection.modes.map((m) => m.name);
	const modeIdToName = new Map(collection.modes.map((m) => [m.modeId, m.name]));

	const variables: FigmaExportVariable[] = [];
	const variableIdToName = new Map<string, string>();

	// First pass: build ID to name map
	for (const varId of collection.variableIds) {
		const figmaVar = await figma.variables.getVariableByIdAsync(varId);
		if (!figmaVar) continue;
		variableIdToName.set(figmaVar.id, figmaVar.name);
	}

	// Second pass: export variables
	for (const varId of collection.variableIds) {
		const figmaVar = await figma.variables.getVariableByIdAsync(varId);
		if (!figmaVar) continue;

		const values: Record<string, unknown> = {};
		let aliasTo: string | undefined;

		for (const [modeId, value] of Object.entries(figmaVar.valuesByMode)) {
			const modeName = modeIdToName.get(modeId);
			if (!modeName) continue;

			if (isVariableAlias(value)) {
				const targetName = variableIdToName.get(value.id);
				if (targetName) {
					aliasTo = figmaToStyleframeName(targetName);
				}
				values[modeName] = value;
			} else {
				values[modeName] = convertFromFigmaValue(value, figmaVar.resolvedType);
			}
		}

		variables.push({
			name: figmaVar.name,
			styleframeName: figmaToStyleframeName(figmaVar.name),
			type: figmaVar.resolvedType,
			values: values as Record<string, FigmaExportVariable["values"][string]>,
			aliasTo,
			description: figmaVar.description || undefined,
		});
	}

	const intermediateData: FigmaExportFormat = {
		collection: collection.name,
		modes,
		variables,
	};

	// Convert to DTCG format
	const exportData = toDTCG(intermediateData);

	figma.ui.postMessage({
		type: "export-complete",
		result: exportData,
	});
}

/**
 * Convert Figma resolved type string
 */
function getResolvedType(type: string): VariableResolvedDataType {
	switch (type) {
		case "COLOR":
			return "COLOR";
		case "FLOAT":
			return "FLOAT";
		case "STRING":
			return "STRING";
		case "BOOLEAN":
			return "BOOLEAN";
		default:
			return "STRING";
	}
}

/**
 * Check if a value is a variable alias
 */
function isVariableAlias(value: unknown): value is VariableAlias {
	return (
		typeof value === "object" &&
		value !== null &&
		"type" in value &&
		(value as { type: string }).type === "VARIABLE_ALIAS"
	);
}

/**
 * Convert a value to Figma format
 */
function convertToFigmaValue(
	value: unknown,
	type: string,
): VariableValue | null {
	if (value === null || value === undefined) return null;

	switch (type) {
		case "COLOR": {
			if (typeof value === "object" && "r" in value) {
				const rgba = value as FigmaRGBA;
				return {
					r: rgba.r,
					g: rgba.g,
					b: rgba.b,
					a: rgba.a ?? 1,
				};
			}
			return null;
		}
		case "FLOAT": {
			return typeof value === "number" ? value : null;
		}
		case "BOOLEAN": {
			return typeof value === "boolean" ? value : null;
		}
		case "STRING":
		default: {
			return String(value);
		}
	}
}

/**
 * Convert a Figma value to export format
 */
function convertFromFigmaValue(
	value: VariableValue,
	type: VariableResolvedDataType,
): FigmaRGBA | number | string | boolean {
	switch (type) {
		case "COLOR": {
			const rgba = value as RGBA;
			return {
				r: rgba.r,
				g: rgba.g,
				b: rgba.b,
				a: rgba.a,
			};
		}
		case "FLOAT": {
			return value as number;
		}
		case "BOOLEAN": {
			return value as boolean;
		}
		case "STRING":
		default: {
			return String(value);
		}
	}
}
